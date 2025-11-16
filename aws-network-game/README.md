# Packet's Escape: AWS Network Puzzle Game

An interactive, educational game that teaches AWS networking concepts through hands-on puzzle solving. Configure VPCs, route tables, security groups, and more to guide packets from source to destination!

## Game Concept

You're the lead AWS network architect for a growing SaaS company. Each level presents networking challenges where you must:

- Design VPCs, subnets, and routing tables
- Configure security groups and NACLs
- Set up hybrid connectivity (VPN, Direct Connect)
- Optimize for cost, security, and performance

Watch packets animate through your network architecture and get real-time feedback on your design decisions!

## Features

- **Interactive Network Canvas**: Drag-and-drop AWS networking components
- **Packet Simulation**: Watch packets travel hop-by-hop through your network
- **Real-time Validation**: Get instant feedback on routing, security, and connectivity
- **Scoring System**: Earn stars based on cost efficiency, security posture, and performance
- **Progressive Learning**: Start with basics (IGW, NAT) and advance to complex scenarios (TGW, multi-region)
- **100% Client-side**: Runs entirely in the browser, perfect for S3 static hosting

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and optimized builds
- **HTML5 Canvas** for network visualization
- **Local Storage** for progress tracking
- **No backend required** - fully static deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone or navigate to the project
cd aws-network-game

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will open at `http://localhost:5173`

### Build for Production

```bash
# Build optimized static files
npm run build

# Preview production build
npm run preview
```

Built files will be in the `dist/` directory, ready for S3 deployment.

## Game Structure

### Worlds

1. **World 1: Core VPC & Routing** - Master VPCs, subnets, IGW, NAT Gateway
2. **World 2: Multi-VPC & Transit** - Learn VPC peering and Transit Gateway
3. **World 3: Hybrid Connectivity** - Master Direct Connect and VPN
4. **World 4: Edge & DNS** - Route 53, CloudFront, Global Accelerator
5. **World 5: Security & Inspection** - Network Firewall, centralized egress

### Current Levels

- **Level 1: First Steps - Internet Gateway** ✅
  - Learn to route traffic from a public subnet to the internet
  - Configure basic route tables
  - Understand IGW fundamentals

More levels coming soon!

## How to Play

1. **Read the Mission Brief**: Understand the networking challenge
2. **Review Objectives**: See what needs to be accomplished
3. **Select Nodes**: Click on network components to configure them
4. **Edit Route Tables**: Add routes to direct traffic
5. **Run Simulation**: Watch packets travel through your network
6. **Get Feedback**: See where packets succeeded or failed
7. **Optimize**: Improve your design for better stars

## Scoring

You're scored on three dimensions:

- **Cost**: Minimize unnecessary resources (NAT GWs, TGWs, etc.)
- **Security**: Avoid overly permissive rules, follow best practices
- **Performance**: Reduce latency and optimize routing paths

Earn 1-3 stars per level based on your performance!

## Project Structure

```
aws-network-game/
├── src/
│   ├── components/          # React components
│   │   ├── NetworkCanvas.tsx    # Network visualization
│   │   ├── ConfigPanel.tsx      # Configuration UI
│   │   ├── GameLevel.tsx        # Main game logic
│   │   └── SimulationPanel.tsx  # Results display
│   ├── engine/              # Game logic
│   │   ├── packetSimulator.ts   # Packet routing simulation
│   │   └── scoring.ts           # Scoring algorithm
│   ├── types/               # TypeScript definitions
│   │   ├── network.ts           # Network types
│   │   └── game.ts              # Game types
│   ├── data/                # Level definitions
│   │   └── levels/
│   │       └── world1-level1.json
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Deploying to AWS S3

### Option 1: Manual Upload

```bash
# Build the project
npm run build

# Create S3 bucket (if needed)
aws s3 mb s3://your-game-bucket-name

# Enable static website hosting
aws s3 website s3://your-game-bucket-name \
  --index-document index.html \
  --error-document index.html

# Upload files
aws s3 sync dist/ s3://your-game-bucket-name --delete

# Make bucket public (configure bucket policy)
```

### Option 2: With CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket --delete

# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name your-bucket.s3.amazonaws.com \
  --default-root-object index.html
```

### Sample S3 Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

## Adding New Levels

Levels are defined as JSON files in `src/data/levels/`. To create a new level:

1. Copy an existing level JSON file
2. Modify the nodes, connections, and objectives
3. Define test packets and scoring criteria
4. Import and add to the level selection in `App.tsx`

Example level structure:

```json
{
  "id": "w1-l2",
  "worldId": 1,
  "levelNumber": 2,
  "title": "Level Title",
  "description": "Brief description",
  "story": "Narrative context",
  "nodes": [...],
  "connections": [...],
  "objectives": [...],
  "testPackets": [...],
  "scoring": {...}
}
```

## Future Enhancements

- [ ] More levels across all 5 worlds
- [ ] Animated packet movement with smooth transitions
- [ ] Sound effects and background music
- [ ] Leaderboard (requires backend)
- [ ] Challenge modes (time attack, limited changes)
- [ ] Network diagram export
- [ ] Hints system with progressive disclosure
- [ ] Achievement badges
- [ ] Dark/light mode toggle

## Learning Resources

This game teaches real AWS networking concepts:

- [VPC User Guide](https://docs.aws.amazon.com/vpc/)
- [AWS Networking Fundamentals](https://aws.amazon.com/products/networking/)
- [Advanced Networking Workshop](https://networking.workshop.aws/)

## Contributing

Want to add levels, improve the UI, or fix bugs? Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for learning, teaching, or building upon!

## Acknowledgments

Inspired by the complexity and elegance of AWS networking, and the need for more hands-on, interactive learning tools for cloud engineers.

---

**Ready to become an AWS networking expert? Start your journey now!**

```bash
npm install
npm run dev
```
