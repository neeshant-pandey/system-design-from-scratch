import { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Collapse,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Brutal Neobrutalism Theme with Black
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00', // Bright lime green
    },
    secondary: {
      main: '#ff00ff', // Bright magenta
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#00ff00',
    },
    warning: {
      main: '#ffff00', // Bright yellow
    },
    info: {
      main: '#00ffff', // Bright cyan
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 900,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      textTransform: 'uppercase',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 900,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 800,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      fontWeight: 500,
    },
    h6: {
      fontWeight: 900,
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 0, // No rounded corners - brutal sharp edges
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

const drawerWidth = 320;

// Complete System Design Curriculum - 3-Level Hierarchy
// SECTION → CHAPTER → TOPICS
const curriculum = [
  {
    id: 'section-1',
    section: 'SECTION I: FOUNDATIONS',
    chapters: [
      {
        id: 'ch-1-1',
        title: 'Introduction to System Design',
        topics: [
          'What is System Design?',
          'Communication, Coordination & Scalability',
          'Resiliency & Maintainability',
          'Anatomy of a Distributed System',
          'System Design Interview Framework',
        ],
      },
      {
        id: 'ch-1-2',
        title: 'Estimation & Calculations',
        topics: [
          'Back of Envelope Calculations',
          'Latency Numbers Every Programmer Should Know',
          'QPS (Queries Per Second) Estimation',
          'Storage & Bandwidth Estimation',
        ],
      },
      {
        id: 'ch-1-3',
        title: 'Database Fundamentals',
        topics: [
          'Database Basics (SQL vs NoSQL)',
          'ACID Properties & Transactions',
          'Database Indexing',
          'Connection Pooling',
          'Query Optimization',
        ],
      },
    ],
  },
  {
    id: 'section-2',
    section: 'SECTION II: COMMUNICATION',
    chapters: [
      {
        id: 'ch-2-1',
        title: 'Network Fundamentals',
        topics: [
          'Reliable Links (TCP)',
          'Secure Links (TLS/SSL)',
          'Encryption, Authentication & Integrity',
          'Connection Lifecycle',
          'Flow Control & Congestion Control',
        ],
      },
      {
        id: 'ch-2-2',
        title: 'APIs & HTTP',
        topics: [
          'REST APIs & HTTP Basics',
          'Request Methods & Status Codes',
          'API Versioning & Idempotency',
          'OpenAPI Specifications',
          'API Evolution & Backward Compatibility',
        ],
      },
      {
        id: 'ch-2-3',
        title: 'Service Discovery',
        topics: [
          'Service Discovery Patterns',
          'DNS-based Discovery',
          'Client-Side vs Server-Side Discovery',
          'Consul, Eureka, etcd',
        ],
      },
    ],
  },
  {
    id: 'section-3',
    section: 'SECTION III: DATA AT REST',
    chapters: [
      {
        id: 'ch-3-1',
        title: 'Scaling Databases',
        topics: [
          'Database Replication (Master-Slave, Multi-Master)',
          'Partitioning & Sharding Strategies',
          'Read Replicas',
          'OLTP vs OLAP',
        ],
      },
      {
        id: 'ch-3-2',
        title: 'NoSQL Databases',
        topics: [
          'Document Stores (MongoDB)',
          'Column Stores (Cassandra, HBase)',
          'Key-Value Stores (Redis, DynamoDB)',
          'Graph Databases (Neo4j)',
        ],
      },
      {
        id: 'ch-3-3',
        title: 'Caching Strategies',
        topics: [
          'Caching Fundamentals',
          'Caching Policies (LRU, LFU, FIFO)',
          'HTTP Caching',
          'Cache Invalidation Strategies',
          'Redis & In-Memory Caching',
        ],
      },
    ],
  },
  {
    id: 'section-4',
    section: 'SECTION IV: FIRST SYSTEMS',
    chapters: [
      {
        id: 'ch-4-1',
        title: 'Simple System Designs',
        topics: [
          'URL Shortener (bit.ly, tinyurl)',
          'Pastebin / Code Sharing Service',
          'Rate Limiter Design',
          'Unique ID Generator',
        ],
      },
      {
        id: 'ch-4-2',
        title: 'Notification Systems',
        topics: [
          'Notification Service Architecture',
          'Push Notifications (FCM, APNS)',
          'Email Service (SMTP)',
          'SMS Gateway Integration',
          'Notification Prioritization & Batching',
        ],
      },
      {
        id: 'ch-4-3',
        title: 'Job Scheduling',
        topics: [
          'Job Scheduling Platform (Cron at Scale)',
          'Task Queue Design',
          'Priority Queues',
          'Dead Letter Queues',
          'Job Retry & Error Handling',
        ],
      },
    ],
  },
  {
    id: 'section-5',
    section: 'SECTION V: SCALABILITY',
    chapters: [
      {
        id: 'ch-5-1',
        title: 'Load Balancing',
        topics: [
          'Load Balancing Fundamentals',
          'Load Balancers with Nginx (Hands-on)',
          'DNS Load Balancing',
          'L4 vs L7 Load Balancing',
          'Load Balancing Algorithms',
          'Health Checks & Failover',
        ],
      },
      {
        id: 'ch-5-2',
        title: 'Content Delivery',
        topics: [
          'Content Delivery Networks (CDN)',
          'Edge Computing',
          'Reverse Proxies',
          'Static vs Dynamic Content',
          'Cache Control Headers',
        ],
      },
      {
        id: 'ch-5-3',
        title: 'Horizontal Scaling',
        topics: [
          'Stateless vs Stateful Services',
          'Session Management',
          'Sticky Sessions',
          'Auto Scaling',
        ],
      },
    ],
  },
  {
    id: 'section-6',
    section: 'SECTION VI: REAL-WORLD APPLICATIONS',
    chapters: [
      {
        id: 'ch-6-1',
        title: 'Social & Communication Platforms',
        topics: [
          'Live News Feed System (Twitter/Instagram)',
          'Chat System Design (WhatsApp/Telegram)',
          'Video Calls (Google Meet/Zoom)',
          '[Assignment] Design Tinder',
        ],
      },
      {
        id: 'ch-6-2',
        title: 'Booking & Reservation Systems',
        topics: [
          'Hotel Reservation System',
          'Booking.com Database Design',
          'Ticket Booking (Movies/Flights)',
          'Handling Double Bookings & Race Conditions',
        ],
      },
      {
        id: 'ch-6-3',
        title: 'Location-Based Services',
        topics: [
          'Uber/Lyft Platform Design',
          'Real-time Location Tracking',
          'Geohashing & Proximity Search',
          '[Assignment] Yelp / Restaurant Discovery',
        ],
      },
      {
        id: 'ch-6-4',
        title: 'Search & Discovery',
        topics: [
          'Google Search Engine Design',
          'Inverted Index & Ranking',
          'Web Crawler Design',
          'Autocomplete / Typeahead',
          'K Heavy Hitter Problem',
        ],
      },
      {
        id: 'ch-6-5',
        title: 'Media & Streaming',
        topics: [
          'Netflix Streaming Platform',
          'YouTube Video Processing',
          'Video Encoding & Adaptive Bitrate',
          'Live Streaming Architecture',
        ],
      },
    ],
  },
  {
    id: 'section-7',
    section: 'SECTION VII: COORDINATION',
    chapters: [
      {
        id: 'ch-7-1',
        title: 'Time & Ordering',
        topics: [
          'Physical Clocks & Synchronization (NTP)',
          'Logical Clocks (Lamport Timestamps)',
          'Vector Clocks',
          'Causality & Happened-Before Relation',
        ],
      },
      {
        id: 'ch-7-2',
        title: 'Distributed Coordination',
        topics: [
          'System Models (Synchronous, Asynchronous)',
          'Failure Detection',
          'Leader Election Algorithms',
          'Raft Consensus Algorithm',
          'Paxos Overview',
        ],
      },
      {
        id: 'ch-7-3',
        title: 'Consistency & Replication',
        topics: [
          'CAP Theorem Explained',
          'PACELC & PIE Theorems',
          'Strong vs Eventual Consistency',
          'Linearizability',
          'Causal Consistency',
          'State Machine Replication',
          'Chain Replication',
        ],
      },
      {
        id: 'ch-7-4',
        title: 'Coordination Avoidance',
        topics: [
          'CALM Theorem',
          'Conflict-Free Replicated Data Types (CRDTs)',
          'Dynamo-Style Data Stores',
          'Gossip Protocols',
        ],
      },
    ],
  },
  {
    id: 'section-8',
    section: 'SECTION VIII: ADVANCED PATTERNS',
    chapters: [
      {
        id: 'ch-8-1',
        title: 'Transactions & Isolation',
        topics: [
          'ACID Properties Deep Dive',
          'Isolation Levels (Read Uncommitted to Serializable)',
          'Two-Phase Commit (2PC)',
          'Atomicity & Durability',
          'Distributed Transactions',
        ],
      },
      {
        id: 'ch-8-2',
        title: 'Asynchronous Transactions',
        topics: [
          'Sagas & Compensating Transactions',
          'Outbox Pattern',
          'Transactional Outbox',
          'Event Sourcing',
        ],
      },
      {
        id: 'ch-8-3',
        title: 'Microservices Architecture',
        topics: [
          'Monolith vs Microservices',
          'Service Decomposition Strategies',
          'API Gateway Pattern',
          'Service Mesh',
          'Inter-Service Communication',
          'Distributed Tracing',
        ],
      },
      {
        id: 'ch-8-4',
        title: 'Design Patterns for Scale',
        topics: [
          'CQRS (Command Query Responsibility Segregation)',
          'Fan-Out Pattern',
          'Sidecar Pattern',
          'Strangler Fig Pattern',
          'Bulkhead Pattern',
          'Constant Work Pattern',
        ],
      },
      {
        id: 'ch-8-5',
        title: 'Control Planes & Data Planes',
        topics: [
          'Separation of Concerns',
          'Scale Imbalance',
          'Control Theory in Distributed Systems',
          'Configuration Management',
        ],
      },
    ],
  },
  {
    id: 'section-9',
    section: 'SECTION IX: RESILIENCY',
    chapters: [
      {
        id: 'ch-9-1',
        title: 'Understanding Failures',
        topics: [
          'Common Failure Causes',
          'Hardware Faults',
          'Network Partitions',
          'Cascading Failures',
          'Byzantine Failures',
        ],
      },
      {
        id: 'ch-9-2',
        title: 'Resiliency Patterns',
        topics: [
          'Timeouts & Deadlines',
          'Retry Strategies (Exponential Backoff)',
          'Circuit Breaker Pattern',
          'Redundancy & Fault Isolation',
          'Shuffle Sharding',
          'Cellular Architecture',
        ],
      },
      {
        id: 'ch-9-3',
        title: 'Load Management',
        topics: [
          'Load Shedding',
          'Load Leveling',
          'Rate Limiting Algorithms',
          'Throttling',
          'Backpressure',
        ],
      },
    ],
  },
  {
    id: 'section-10',
    section: 'SECTION X: DATA IN MOTION',
    chapters: [
      {
        id: 'ch-10-1',
        title: 'Messaging Systems',
        topics: [
          'Message Queues vs Event Streams',
          'Pub-Sub Architecture',
          'Message Delivery Guarantees',
          'Exactly-Once Processing',
          'Kafka, RabbitMQ, AWS SQS',
        ],
      },
      {
        id: 'ch-10-2',
        title: 'Stream Processing',
        topics: [
          'Batch vs Stream Processing',
          'Event-Driven Architecture',
          'Change Data Capture (CDC)',
          'Handling Backlogs',
        ],
      },
      {
        id: 'ch-10-3',
        title: 'Storage Systems',
        topics: [
          'Dropbox / Google Drive Design',
          'Blob Storage (S3-like)',
          'File System Internals',
          'Data Deduplication & Compression',
        ],
      },
      {
        id: 'ch-10-4',
        title: 'Database Internals',
        topics: [
          'Build Your Own Database (LSM Trees)',
          'B-Trees vs LSM Trees',
          'Write-Ahead Logs (WAL)',
          'Storage Engines',
        ],
      },
      {
        id: 'ch-10-5',
        title: 'Big Data & Analytics',
        topics: [
          'Big Data Processing (Hadoop, Spark)',
          'MapReduce Paradigm',
          'Data Warehousing (Redshift, BigQuery)',
          'Real-Time Analytics',
          'Ad Click Event Platform',
        ],
      },
    ],
  },
  {
    id: 'section-11',
    section: 'SECTION XI: OPERATIONS',
    chapters: [
      {
        id: 'ch-11-1',
        title: 'Cloud Infrastructure',
        topics: [
          'AWS Services (EC2, S3, RDS)',
          'AWS Lambda & Serverless',
          'DynamoDB & ElastiCache',
          'Auto Scaling & ELB',
          'Multi-Region Architecture',
        ],
      },
      {
        id: 'ch-11-2',
        title: 'Infrastructure Services',
        topics: [
          'Distributed Lock Service (Chubby/ZooKeeper)',
          'Configuration Service',
          'Secret Management',
        ],
      },
      {
        id: 'ch-11-3',
        title: 'Observability',
        topics: [
          'Monitoring & Metrics',
          'Logs, Traces & Metrics (3 Pillars)',
          'Distributed Tracing',
          'Debugging Production Issues',
        ],
      },
      {
        id: 'ch-11-4',
        title: 'SRE Practices',
        topics: [
          'Service-Level Indicators (SLIs)',
          'Service-Level Objectives (SLOs)',
          'Error Budgets',
          'Alerts & Dashboards',
          'Being On-Call & Incident Response',
        ],
      },
      {
        id: 'ch-11-5',
        title: 'Testing & Deployment',
        topics: [
          'Testing Strategies (Unit, Integration, E2E)',
          'Chaos Engineering',
          'Formal Verification (TLA+)',
          'CI/CD Pipelines',
          'Deployment Strategies (Blue-Green, Canary)',
          'Feature Flags & Rollbacks',
        ],
      },
      {
        id: 'ch-11-6',
        title: 'Advanced System Designs',
        topics: [
          'Stock Exchange Design',
          'Payment Processing (Stripe/PayPal)',
          'Distributed Gaming Leaderboard',
          'NewSQL Databases (CockroachDB, Spanner)',
        ],
      },
    ],
  },
];

function App() {
  const [selectedTopic, setSelectedTopic] = useState('What is System Design?');
  const [expandedSections, setExpandedSections] = useState({ 'section-1': true });
  const [expandedChapters, setExpandedChapters] = useState({ 'ch-1-1': true });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'background.paper',
              borderRight: '5px solid #00ff00',
              boxShadow: '8px 0 0 0 #00ff00',
            },
          }}
        >
          {/* Sidebar Header */}
          <Box
            sx={{
              p: 3,
              borderBottom: '5px solid #00ff00',
              backgroundColor: '#000',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MenuBookIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>
                System Design
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'primary.main', mt: 1, display: 'block', fontWeight: 700, fontSize: '0.9rem' }}>
              FROM SCRATCH
            </Typography>
          </Box>

          {/* Curriculum List */}
          <Box sx={{ overflow: 'auto', py: 2 }}>
            <List disablePadding>
              {curriculum.map((section) => (
                <Box key={section.id}>
                  {/* Section */}
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => toggleSection(section.id)}
                      sx={{
                        px: 2,
                        py: 1.5,
                        mx: 1.5,
                        my: 0.5,
                        border: '3px solid #00ff00',
                        backgroundColor: expandedSections[section.id] ? '#00ff00' : 'transparent',
                        boxShadow: expandedSections[section.id] ? '4px 4px 0 0 #fff' : 'none',
                        '&:hover': {
                          backgroundColor: '#00ff00',
                          boxShadow: '4px 4px 0 0 #fff',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {expandedSections[section.id] ? (
                          <ExpandMoreIcon sx={{ fontSize: 20, color: '#000', mr: 1 }} />
                        ) : (
                          <ChevronRightIcon sx={{ fontSize: 20, color: '#00ff00', mr: 1 }} />
                        )}
                        <ListItemText
                          primary={section.section}
                          primaryTypographyProps={{
                            fontWeight: 900,
                            fontSize: '0.85rem',
                            color: expandedSections[section.id] ? '#000' : 'primary.main',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        />
                      </Box>
                    </ListItemButton>
                  </ListItem>

                  {/* Chapters within Section */}
                  <Collapse in={expandedSections[section.id]} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      {section.chapters.map((chapter) => (
                        <Box key={chapter.id}>
                          {/* Chapter */}
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => toggleChapter(chapter.id)}
                              sx={{
                                pl: 4,
                                pr: 2,
                                py: 1,
                                mx: 1.5,
                                my: 0.3,
                                border: '2px solid #ffff00',
                                backgroundColor: expandedChapters[chapter.id] ? '#ffff00' : 'transparent',
                                '&:hover': {
                                  backgroundColor: '#ffff00',
                                  boxShadow: '3px 3px 0 0 #fff',
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                {expandedChapters[chapter.id] ? (
                                  <ExpandMoreIcon sx={{ fontSize: 16, color: '#000', mr: 1 }} />
                                ) : (
                                  <ChevronRightIcon sx={{ fontSize: 16, color: '#ffff00', mr: 1 }} />
                                )}
                                <ListItemText
                                  primary={chapter.title}
                                  primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                    fontWeight: 800,
                                    color: expandedChapters[chapter.id] ? '#000' : 'warning.main',
                                  }}
                                />
                              </Box>
                            </ListItemButton>
                          </ListItem>

                          {/* Topics within Chapter */}
                          <Collapse in={expandedChapters[chapter.id]} timeout="auto" unmountOnExit>
                            <List disablePadding>
                              {chapter.topics.map((topic) => (
                                <ListItem key={topic} disablePadding>
                                  <ListItemButton
                                    onClick={() => setSelectedTopic(topic)}
                                    sx={{
                                      pl: 7,
                                      pr: 2,
                                      py: 0.8,
                                      mx: 1.5,
                                      my: 0.2,
                                      border: selectedTopic === topic ? '2px solid #ff00ff' : '2px solid transparent',
                                      backgroundColor: selectedTopic === topic ? '#ff00ff' : 'transparent',
                                      '&:hover': {
                                        backgroundColor: '#ff00ff',
                                        border: '2px solid #ff00ff',
                                      },
                                    }}
                                  >
                                    <ListItemText
                                      primary={topic}
                                      primaryTypographyProps={{
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: selectedTopic === topic ? '#000' : 'text.primary',
                                      }}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        </Box>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: 'background.default',
            minHeight: '100vh',
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              py: 6,
              px: { xs: 3, sm: 4, md: 6 },
            }}
          >
            {/* Hero Section */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  color: '#00ff00',
                  textShadow: '5px 5px 0 #ff00ff, 10px 10px 0 #ffff00',
                }}
              >
                Master System Design
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#ff00ff',
                  border: '4px solid #000',
                  boxShadow: '8px 8px 0 0 #00ff00',
                  p: 3,
                  maxWidth: '700px',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.25rem',
                    color: '#000',
                    fontWeight: 700,
                    lineHeight: 1.5,
                  }}
                >
                  Learn how to design scalable, reliable, and efficient systems from the ground up.
                  A comprehensive guide covering 11 sections, 50+ chapters, and 200+ topics.
                </Typography>
              </Box>
            </Box>

            {/* Current Topic Content */}
            <Box
              sx={{
                backgroundColor: '#1a1a1a',
                p: 4,
                border: '5px solid #ffff00',
                boxShadow: '10px 10px 0 0 #ff00ff',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 3,
                  color: '#ffff00',
                  textShadow: '3px 3px 0 #00ffff',
                }}
              >
                {selectedTopic}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#fff' }}>
                Welcome to the comprehensive System Design course! This curriculum is structured
                with 11 major sections covering everything from foundations to production operations.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#fff' }}>
                Navigate through the 3-level hierarchy: <strong style={{ color: '#00ff00' }}>SECTIONS</strong> → <strong style={{ color: '#ffff00' }}>CHAPTERS</strong> → <strong style={{ color: '#ff00ff' }}>TOPICS</strong>
              </Typography>
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: '#00ffff',
                  border: '4px solid #000',
                  boxShadow: '6px 6px 0 0 #ff00ff',
                }}
              >
                <Typography variant="body1" sx={{ color: '#000', fontWeight: 700 }}>
                  Content for each topic will be added in the next phase. For now, explore the
                  comprehensive curriculum structure in the sidebar!
                </Typography>
              </Box>
            </Box>

            {/* Footer Note */}
            <Box
              sx={{
                mt: 6,
                pt: 4,
                borderTop: '5px solid #00ff00',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  backgroundColor: '#00ff00',
                  border: '3px solid #000',
                  boxShadow: '5px 5px 0 0 #fff',
                  px: 4,
                  py: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: '#000', fontWeight: 900, fontSize: '1rem' }}>
                  11 SECTIONS • 50+ CHAPTERS • 200+ TOPICS • THEORY + PRACTICE
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
