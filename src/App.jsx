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
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
  const [selectedTopic, setSelectedTopic] = useState('Intro to System Design');

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

          {/* Topics List */}
          <Box sx={{ overflow: 'auto', py: 2 }}>
            <List disablePadding>
              {topics.map((topic) => (
                <Box key={topic.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => setSelectedTopic(topic.title)}
                      sx={{
                        px: 3,
                        py: 1.5,
                        mx: 2,
                        my: 0.5,
                        border: selectedTopic === topic.title ? '3px solid #00ff00' : '3px solid transparent',
                        backgroundColor: selectedTopic === topic.title ? '#00ff00' : 'transparent',
                        boxShadow: selectedTopic === topic.title ? '4px 4px 0 0 #fff' : 'none',
                        '&:hover': {
                          backgroundColor: '#00ff00',
                          border: '3px solid #00ff00',
                          boxShadow: '4px 4px 0 0 #fff',
                        },
                      }}
                    >
                      <ListItemText
                        primary={topic.title}
                        primaryTypographyProps={{
                          fontWeight: 800,
                          fontSize: '1rem',
                          color: selectedTopic === topic.title ? '#000' : 'text.primary',
                          textTransform: 'uppercase',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  {/* Subtopics */}
                  {topic.subtopics.map((subtopic) => (
                    <ListItem key={subtopic} disablePadding>
                      <ListItemButton
                        onClick={() => setSelectedTopic(subtopic)}
                        sx={{
                          pl: 5,
                          pr: 3,
                          py: 1,
                          mx: 2,
                          my: 0.3,
                          border: selectedTopic === subtopic ? '2px solid #ffff00' : '2px solid transparent',
                          backgroundColor: selectedTopic === subtopic ? '#ffff00' : 'transparent',
                          '&:hover': {
                            backgroundColor: '#ffff00',
                            border: '2px solid #ffff00',
                            boxShadow: '3px 3px 0 0 #fff',
                          },
                        }}
                      >
                        <ListItemText
                          primary={subtopic}
                          primaryTypographyProps={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: selectedTopic === subtopic ? '#000' : 'text.secondary',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
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
                  A comprehensive guide for engineers and architects.
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
                Welcome to the System Design course! This is Phase 1 - the foundation of our
                book-style learning platform.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#fff' }}>
                In future phases, this content area will be populated with comprehensive lessons,
                interactive diagrams, code examples, and real-world case studies.
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
                  Select a topic from the sidebar to navigate through the course content.
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
                  PHASE 1: FOUNDATION COMPLETE ✓ • BUILT WITH REACT + MUI
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
