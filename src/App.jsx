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

// Complete System Design Curriculum
const topics = [
  {
    id: 1,
    title: 'Welcome to System Design',
    subtopics: [
      'Intro to System Design',
      'Estimation and Back of Envelope Calculations',
    ],
  },
  {
    id: 2,
    title: 'Building Blocks - Communication & Data',
    subtopics: [
      'REST API Basics',
      'Database Fundamentals (DBMS Basics)',
      'Scaling Databases (Understanding DBMS for Scale)',
      'Asynchronous Communication',
    ],
  },
  {
    id: 3,
    title: 'Infrastructure Essentials',
    subtopics: [
      'Load Balancers with Nginx',
      'Caching & Key Value Stores',
      'Design Patterns for Scalable Systems',
      'Rate Limiters',
    ],
  },
  {
    id: 4,
    title: 'Cloud Infrastructure',
    subtopics: [
      'AWS Services Part 1',
      'AWS Services Part 2',
    ],
  },
  {
    id: 5,
    title: 'Your First Real Designs',
    subtopics: [
      'URL Shortener',
      'Notification Service',
      'Job Scheduling Platform',
    ],
  },
  {
    id: 6,
    title: 'Social & Communication Platforms',
    subtopics: [
      'Live News Feed System',
      'Chat System (WhatsApp)',
      'Video Calls (Google Meet)',
      '[Assignment] Design Tinder',
    ],
  },
  {
    id: 7,
    title: 'Marketplace & Booking Systems',
    subtopics: [
      'Hotel Reservation System',
      'Booking.com Database Design',
      'Uber Platform',
      '[Assignment] Yelp App',
    ],
  },
  {
    id: 8,
    title: 'Search & Discovery',
    subtopics: [
      'Google Search Engine',
      'K Heavy Hitter Problem',
    ],
  },
  {
    id: 9,
    title: 'Media & Content Delivery',
    subtopics: [
      'Netflix Streaming Platform',
      'Ad Click Event Platform',
    ],
  },
  {
    id: 10,
    title: 'Storage & File Systems',
    subtopics: [
      'Dropbox / File Storage Service',
      'File System Internals',
      'Build Your Own Database (LSM Trees)',
    ],
  },
  {
    id: 11,
    title: 'Distributed Systems Theory',
    subtopics: [
      'Consistency Models: CAP, PACELC, PIE',
      'Consensus with Raft',
      'AWS Dynamo DB & Redshift',
    ],
  },
  {
    id: 12,
    title: 'Advanced Specialized Topics',
    subtopics: [
      'Stock Exchange Design',
      'Big Data Processing',
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
