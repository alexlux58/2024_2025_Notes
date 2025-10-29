# file resource creates and manages files on the local filesystem.
# Common attributes:
#
# Required:
#   filename        - (Required) The path to the file that will be created
#   content         - (Required if source not set) The content to write to the file
#   source          - (Required if content not set) Path to a file whose content will be used
#
# Optional:
#   file_permission - (Optional) Permissions to set for the file (e.g., "0644", "0755")
#   directory_permission - (Optional) Permissions for parent directories if created (e.g., "0755")
#
# Example values:
#   filename = "/tmp/example.txt"
#   content  = "Hello, World!"
#   file_permission = "0644"
resource "local_file" "name" {
  filename = "/tmp/example.txt"
    content  = "Hello, World!"
    file_permission = "0644"
    
}