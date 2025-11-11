import { useState, useEffect } from 'react';
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
import LatexRenderer from './components/LatexRenderer';
import { loadTopicContent } from './utils/contentLoader';

// Sophisticated Minimal Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e8e8e8', // Off-white
    },
    secondary: {
      main: '#facc15', // Yellow accent
    },
    background: {
      default: '#000000',
      paper: '#0a0a0a',
    },
    text: {
      primary: '#f5f5f5', // Off-white
      secondary: '#a8a8a8', // Muted gray
    },
    warning: {
      main: '#facc15', // Yellow
    },
    info: {
      main: '#e8e8e8', // Light off-white
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.8,
      fontWeight: 400,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 0,
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

const drawerWidth = 280;

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
          'Understanding System Design',
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
  const [selectedTopic, setSelectedTopic] = useState('Understanding System Design');
  const [expandedSections, setExpandedSections] = useState({ 'section-1': true });
  const [expandedChapters, setExpandedChapters] = useState({ 'ch-1-1': true });
  const [topicContent, setTopicContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  // Load content when topic changes
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const { content } = await loadTopicContent(curriculum, selectedTopic);
      setTopicContent(content);
      setIsLoading(false);
    };

    fetchContent();
  }, [selectedTopic]);

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
              borderRight: '1px solid rgba(232, 232, 232, 0.15)',
            },
          }}
        >
          {/* Sidebar Header */}
          <Box
            sx={{
              p: 3,
              pb: 2.5,
              borderBottom: '1px solid rgba(232, 232, 232, 0.12)',
              backgroundColor: '#000',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MenuBookIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#f5f5f5', letterSpacing: '-0.01em' }}>
                System Design
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1.5, display: 'block', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              From Scratch
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
                        py: 1.25,
                        mx: 2,
                        my: 0.5,
                        borderLeft: expandedSections[section.id] ? '2px solid #d4af37' : '2px solid transparent',
                        backgroundColor: expandedSections[section.id] ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(212, 175, 55, 0.12)',
                          borderLeft: '2px solid #d4af37',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {expandedSections[section.id] ? (
                          <ExpandMoreIcon sx={{ fontSize: 18, color: '#d4af37', mr: 1 }} />
                        ) : (
                          <ChevronRightIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                        )}
                        <ListItemText
                          primary={section.section}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                            color: expandedSections[section.id] ? '#d4af37' : 'text.secondary',
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
                                mx: 2,
                                my: 0.25,
                                borderLeft: expandedChapters[chapter.id] ? '2px solid #94a3b8' : '2px solid transparent',
                                backgroundColor: expandedChapters[chapter.id] ? 'rgba(148, 163, 184, 0.08)' : 'transparent',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(148, 163, 184, 0.12)',
                                  borderLeft: '2px solid #94a3b8',
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                {expandedChapters[chapter.id] ? (
                                  <ExpandMoreIcon sx={{ fontSize: 16, color: '#94a3b8', mr: 1 }} />
                                ) : (
                                  <ChevronRightIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                                )}
                                <ListItemText
                                  primary={chapter.title}
                                  primaryTypographyProps={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: expandedChapters[chapter.id] ? '#cbd5e1' : 'text.secondary',
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
                                      pl: 6.5,
                                      pr: 2,
                                      py: 0.75,
                                      mx: 2,
                                      my: 0.2,
                                      borderLeft: selectedTopic === topic ? '1px solid rgba(212, 175, 55, 0.5)' : '1px solid transparent',
                                      backgroundColor: selectedTopic === topic ? 'rgba(212, 175, 55, 0.06)' : 'transparent',
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        backgroundColor: selectedTopic === topic ? 'rgba(212, 175, 55, 0.1)' : 'rgba(212, 175, 55, 0.05)',
                                      },
                                    }}
                                  >
                                    <ListItemText
                                      primary={topic}
                                      primaryTypographyProps={{
                                        fontSize: '0.8125rem',
                                        fontWeight: selectedTopic === topic ? 500 : 400,
                                        color: selectedTopic === topic ? '#e5c07b' : 'text.secondary',
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
            p: 0,
          }}
        >
           <Container>
          {/* Current Topic Content - Full Width */}
          <Box
            sx={{
              minHeight: '100vh',
              p: { xs: 3, sm: 4, md: 6 },
            }}
          >
           
            {/* Topic Title with Accent */}
            <Box
              sx={{
                mb: 5,
                pb: 3,
                borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: '#f8f8f8',
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  mb: 0.5,
                }}
              >
                {selectedTopic}
              </Typography>
            </Box>

            {/* Content */}
            <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
              {isLoading ? (
                <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  Loading content...
                </Typography>
              ) : (
                <LatexRenderer content={topicContent} />
              )}
            </Box>
          </Box>

            {/* Footer Note */}
            <Box
              sx={{
                mt: 8,
                pt: 5,
                borderTop: '1px solid rgba(232, 232, 232, 0.1)',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                11 Sections • 50+ Chapters • 200+ Topics • Theory + Practice
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
