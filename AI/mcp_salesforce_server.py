# uv venv && source .venv/bin/activate
# uv pip install mcp simple-salesforce requests python-dotenv


# mcp_salesforce_server.py
import os
from mcp.server import Server, Tool, run
from simple_salesforce import Salesforce
from simple_salesforce.exceptions import SalesforceMalformedRequest


def sf_client():
    # Use a refresh flow you store at boot; or use simple_salesforce with session_id+instance_url
    return Salesforce(
        instance_url=os.environ["SF_INSTANCE_URL"],
        session_id=os.environ["SF_ACCESS_TOKEN"],
        client_id="mcp-salesforce/1.0"
    )


srv = Server(name="salesforce-cases")


@srv.tool(
    name="soql_search_cases",
    description="Run SOQL over Case and related objects. Returns JSON rows."
)
def soql_search_cases(query: str, limit: int = 50):
    sf = sf_client()
    # You can validate/sanitize the SOQL or use format_soql helpers
    res = sf.query(f"{query} LIMIT {limit}")
    return {"totalSize": res["totalSize"], "records": res["records"]}


@srv.tool(
    name="get_case",
    description="Get Case by Id or CaseNumber with key fields, comments, emails"
)
def get_case(case_id_or_number: str):
    sf = sf_client()
    # Resolve to Id
    q = sf.query(f"SELECT Id, CaseNumber, Subject, Status, Priority, Origin, "
                 f"CreatedDate, ClosedDate, Account.Name, Contact.Email, Description "
                 f"FROM Case WHERE Id='{case_id_or_number}' OR CaseNumber='{case_id_or_number}' LIMIT 1")
    if not q["records"]:
        return {"error": "Not found"}
    c = q["records"][0]
    # Comments
    comments = sf.query(f"SELECT Id, CommentBody, CreatedBy.Name, CreatedDate "
                        f"FROM CaseComment WHERE ParentId='{c['Id']}' ORDER BY CreatedDate DESC")
    # Emails (if EmailMessage is enabled)
    emails = sf.query(f"SELECT Id, Subject, FromAddress, ToAddress, CreatedDate "
                      f"FROM EmailMessage WHERE ParentId='{c['Id']}' ORDER BY CreatedDate DESC")
    return {"case": c, "comments": comments["records"], "emails": emails["records"]}


@srv.tool(
    name="recent_cases",
    description="List recent Cases for an Account name or Contact email"
)
def recent_cases(account_or_contact: str, days: int = 90, limit: int = 20):
    sf = sf_client()
    soql = (
        "SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate, Account.Name, Contact.Email "
        f"FROM Case WHERE (Account.Name LIKE '%{account_or_contact}%' "
        f"OR Contact.Email LIKE '%{account_or_contact}%') "
        f"AND CreatedDate = LAST_N_DAYS:{days} "
        "ORDER BY CreatedDate DESC "
        f"LIMIT {limit}"
    )
    return sf.query(soql)["records"]


@srv.tool(
    name="summarize_case",
    description="Return a concise summary of a Case for LLM use"
)
def summarize_case(case_id_or_number: str):
    # In practice, fetch full details + comments, then craft a structured text summary here.
    data = get_case(case_id_or_number)
    # …generate summary text locally or call your preferred LLM inside the server…
    return {"summary": f"Synthesized summary for {data['case'].get('CaseNumber')}", "data": data}


if __name__ == "__main__":
    run(srv)
