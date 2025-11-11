import { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
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
  IconButton,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const drawerWidth = 280;

// Complete System Design Curriculum - Comprehensive Edition
const topics = [
  {
    id: 1,
    title: '1. Foundations of System Design',
    subtopics: [
      'Introduction to System Design',
      'Communication, Coordination & Scalability',
      'Resiliency & Maintainability',
      'Anatomy of a Distributed System',
      'Estimation and Back of Envelope Calculations',
    ],
  },
  {
    id: 2,
    title: '2. Communication Fundamentals',
    subtopics: [
      'Reliable Links (TCP)',
      'Secure Links (TLS/SSL)',
      'Encryption, Authentication & Integrity',
      'Service Discovery',
      'REST APIs & HTTP',
      'Request Methods & Status Codes',
      'API Evolution & Idempotency',
      'OpenAPI Specifications',
    ],
  },
  {
    id: 3,
    title: '3. Data Storage & Databases',
    subtopics: [
      'Database Fundamentals (DBMS Basics)',
      'SQL vs NoSQL',
      'Scaling Databases',
      'Replication Strategies',
      'Partitioning & Sharding',
      'Database Indexing',
    ],
  },
  {
    id: 4,
    title: '4. Caching & Performance',
    subtopics: [
      'HTTP Caching',
      'Caching Policies (LRU, LFU, FIFO)',
      'Local vs External Cache',
      'Content Delivery Networks (CDN)',
      'Cache Invalidation Strategies',
      'Key Value Stores & Redis',
    ],
  },
  {
    id: 5,
    title: '5. Load Balancing & Traffic Management',
    subtopics: [
      'Load Balancers with Nginx (Hands-on)',
      'DNS Load Balancing',
      'Transport Layer Load Balancing (L4)',
      'Application Layer Load Balancing (L7)',
      'Load Balancing Algorithms',
      'Health Checks & Failover',
    ],
  },
  {
    id: 6,
    title: '6. Time, Clocks & Ordering',
    subtopics: [
      'Physical Clocks & Clock Synchronization',
      'Logical Clocks (Lamport Timestamps)',
      'Vector Clocks',
      'Causality & Happened-Before Relation',
    ],
  },
  {
    id: 7,
    title: '7. Distributed Coordination',
    subtopics: [
      'System Models (Synchronous, Asynchronous)',
      'Failure Detection',
      'Leader Election',
      'Raft Leader Election Algorithm',
      'Consensus Protocols',
      'State Machine Replication',
      'Chain Replication',
    ],
  },
  {
    id: 8,
    title: '8. Consistency & Replication',
    subtopics: [
      'Consistency Models: CAP, PACELC, PIE',
      'Strong vs Eventual Consistency',
      'Linearizability',
      'Causal Consistency',
      'Coordination Avoidance (CALM Theorem)',
      'Conflict-Free Replicated Data Types (CRDTs)',
      'Dynamo-Style Data Stores',
    ],
  },
  {
    id: 9,
    title: '9. Transactions & Isolation',
    subtopics: [
      'ACID Properties',
      'Isolation Levels (Read Uncommitted to Serializable)',
      'Two-Phase Commit (2PC)',
      'Atomicity & Durability',
      'Asynchronous Transactions',
      'Sagas & Compensating Transactions',
      'Outbox Pattern',
      'NewSQL Databases',
    ],
  },
  {
    id: 10,
    title: '10. Messaging & Event-Driven Architecture',
    subtopics: [
      'Message Queues vs Event Streams',
      'Asynchronous Communication Patterns',
      'Pub-Sub Architecture',
      'Message Delivery Guarantees',
      'Exactly-Once Processing',
      'Handling Backlogs & Fault Isolation',
      'Kafka, RabbitMQ, SQS',
    ],
  },
  {
    id: 11,
    title: '11. Microservices Architecture',
    subtopics: [
      'Monolith vs Microservices',
      'Service Decomposition Strategies',
      'API Gateway Pattern',
      'Service Mesh',
      'Inter-Service Communication',
      'Distributed Tracing',
      'Microservices Caveats',
    ],
  },
  {
    id: 12,
    title: '12. Resiliency Patterns',
    subtopics: [
      'Common Failure Causes',
      'Redundancy & Fault Isolation',
      'Timeouts & Deadlines',
      'Retry Strategies (Exponential Backoff)',
      'Circuit Breaker Pattern',
      'Bulkhead Pattern',
      'Load Shedding & Load Leveling',
      'Rate Limiting Algorithms',
      'Shuffle Sharding',
      'Cellular Architecture',
    ],
  },
  {
    id: 13,
    title: '13. Cloud Infrastructure (AWS)',
    subtopics: [
      'AWS Services Part 1 (EC2, S3, RDS)',
      'AWS Services Part 2 (Lambda, DynamoDB, ElastiCache)',
      'Blob Storage Architecture',
      'Auto Scaling & Elastic Load Balancing',
      'AWS Dynamo DB & Redshift',
    ],
  },
  {
    id: 14,
    title: '14. Control Planes & Data Planes',
    subtopics: [
      'Separation of Concerns',
      'Scale Imbalance',
      'Control Theory in Distributed Systems',
      'Configuration Management',
    ],
  },
  {
    id: 15,
    title: '15. Design Patterns for Scalable Systems',
    subtopics: [
      'Scalability Patterns Overview',
      'Fan-Out Pattern',
      'Sidecar Pattern',
      'Strangler Fig Pattern',
      'CQRS (Command Query Responsibility Segregation)',
      'Event Sourcing',
      'Constant Work Pattern',
    ],
  },
  {
    id: 16,
    title: '16. Your First Real Designs',
    subtopics: [
      'URL Shortener',
      'Notification Service (Push, Email, SMS)',
      'Job Scheduling Platform',
      'Rate Limiter Design',
    ],
  },
  {
    id: 17,
    title: '17. Social & Communication Platforms',
    subtopics: [
      'Live News Feed System (Twitter/Facebook)',
      'Chat System Design (WhatsApp)',
      'Video Calls (Google Meet)',
      '[Assignment] Design Tinder',
    ],
  },
  {
    id: 18,
    title: '18. Marketplace & Booking Systems',
    subtopics: [
      'Hotel Reservation System',
      'Booking.com Database Design',
      'Uber Platform (Real-time Location)',
      '[Assignment] Yelp App',
    ],
  },
  {
    id: 19,
    title: '19. Search & Discovery Systems',
    subtopics: [
      'Google Search Engine (Crawling, Indexing, Ranking)',
      'Inverted Index',
      'K Heavy Hitter Problem',
      'Top-K Frequent Items',
    ],
  },
  {
    id: 20,
    title: '20. Media & Content Delivery',
    subtopics: [
      'Netflix Streaming Platform',
      'Video Encoding & Adaptive Bitrate',
      'Ad Click Event Platform',
      'Real-Time Analytics',
    ],
  },
  {
    id: 21,
    title: '21. Storage Systems & File Management',
    subtopics: [
      'Dropbox / File Storage Service',
      'File System Internals',
      'Blob Storage (S3-like)',
      'Data Deduplication & Compression',
      'Build Your Own Database (LSM Trees)',
    ],
  },
  {
    id: 22,
    title: '22. Big Data & Analytics',
    subtopics: [
      'Big Data Processing (Hadoop, Spark)',
      'MapReduce Paradigm',
      'Batch vs Stream Processing',
      'Data Warehousing',
      'OLTP vs OLAP',
    ],
  },
  {
    id: 23,
    title: '23. Advanced System Designs',
    subtopics: [
      'Stock Exchange Design',
      'Payment Processing System',
      'Distributed Lock Service',
      'Configuration Service (like ZooKeeper)',
    ],
  },
  {
    id: 24,
    title: '24. Observability & Operations',
    subtopics: [
      'Monitoring & Metrics',
      'Service-Level Indicators (SLIs)',
      'Service-Level Objectives (SLOs)',
      'Alerts & Dashboards',
      'Logs, Traces & Metrics',
      'Distributed Tracing',
      'Being On-Call',
    ],
  },
  {
    id: 25,
    title: '25. Testing Distributed Systems',
    subtopics: [
      'Unit, Integration & E2E Testing',
      'Chaos Engineering',
      'Fault Injection',
      'Formal Verification (TLA+)',
      'Load Testing & Performance Testing',
    ],
  },
  {
    id: 26,
    title: '26. Deployment & Release Management',
    subtopics: [
      'Continuous Integration & Delivery',
      'Deployment Strategies (Blue-Green, Canary)',
      'Feature Flags',
      'Rollbacks & Rollforwards',
      'Infrastructure as Code',
    ],
  },
];

function App() {

  const [selectedTopic, setSelectedTopic] = useState('Introduction');
  const [expandedTopics, setExpandedTopics] = useState({
    1: true, // Introduction expanded by default
    2: false,
    3: false,
    4: false,
  });

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
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

          {/* Topics List */}
          <Box sx={{ overflow: 'auto', py: 2 }}>
            <List disablePadding>
              {topics.map((topic) => (
                <Box key={topic.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => toggleTopic(topic.id)}
                      sx={{
                        px: 2,
                        py: 1.25,
                        mx: 2,
                        my: 0.5,
                        '&:hover': {
                          backgroundColor: 'rgba(232, 232, 232, 0.08)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {expandedTopics[topic.id] ? (
                          <ExpandMoreIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                        ) : (
                          <ChevronRightIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                        )}
                        <ListItemText
                          primary={topic.title}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            fontSize: '0.9375rem',
                            color: 'text.secondary',
                            letterSpacing: '-0.01em',
                          }}
                        />
                      </Box>
                    </ListItemButton>
                  </ListItem>

                  {/* Subtopics - Collapsible */}
                  <Collapse in={expandedTopics[topic.id]} timeout="auto" unmountOnExit>
                    {topic.subtopics.map((subtopic) => (
                      <ListItem key={subtopic} disablePadding>
                        <ListItemButton
                          onClick={() => setSelectedTopic(subtopic)}
                          sx={{
                            pl: 5.5,
                            pr: 3,
                            py: 0.875,
                            mx: 2,
                            my: 0.25,
                            borderLeft: selectedTopic === subtopic ? '1px solid rgba(232, 232, 232, 0.3)' : '1px solid transparent',
                            backgroundColor: selectedTopic === subtopic ? 'rgba(232, 232, 232, 0.05)' : 'transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(232, 232, 232, 0.08)',
                              borderLeft: '1px solid rgba(232, 232, 232, 0.3)',
                            },
                          }}
                        >
                          <ListItemText
                            primary={subtopic}
                            primaryTypographyProps={{
                              fontSize: '0.8125rem',
                              fontWeight: 400,
                              color: selectedTopic === subtopic ? '#f5f5f5' : 'text.secondary',
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
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
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h1"
                sx={{
                  mb: 2.5,
                  color: '#f5f5f5',
                  letterSpacing: '-0.04em',
                }}
              >
                Master System Design
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.125rem',
                  color: 'text.secondary',
                  maxWidth: '650px',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Learn how to design scalable, reliable, and efficient systems from the ground up.
                A comprehensive guide for engineers and architects.
              </Typography>
            </Box>

            {/* Current Topic Content */}
            <Box
              sx={{
                backgroundColor: 'rgba(232, 232, 232, 0.02)',
                p: 5,
                border: '1px solid rgba(232, 232, 232, 0.12)',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 3.5,
                  color: '#f5f5f5',
                }}
              >
                {selectedTopic}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary', lineHeight: 1.8 }}>
                Welcome to the System Design course! This is Phase 1 - the foundation of our
                book-style learning platform.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary', lineHeight: 1.8 }}>
                In future phases, this content area will be populated with comprehensive lessons,
                interactive diagrams, code examples, and real-world case studies.
              </Typography>
              <Typography variant="body1" sx={{ mt: 4, color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.8 }}>
                Select a topic from the sidebar to navigate through the course content.
              </Typography>
            </Box>

            {/* Footer Note */}
            <Box
              sx={{
                mt: 8,
                pt: 5,
                borderTop: '1px solid rgba(232, 232, 232, 0.08)',
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 400, fontSize: '0.8125rem', letterSpacing: '0.05em' }}>
                Phase 1: Foundation Complete • Built with React + MUI
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
