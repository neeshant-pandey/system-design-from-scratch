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

// Create a custom theme inspired by react.gg
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#ffffff',
      paper: '#f9fafb',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
      color: '#374151',
    },
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

// Placeholder topics structure - will be expanded in future phases
const topics = [
  { id: 1, title: 'Introduction', subtopics: ['What is System Design?', 'Why Learn System Design?'] },
  { id: 2, title: 'Fundamentals', subtopics: ['Scalability', 'Reliability', 'Availability'] },
  { id: 3, title: 'Components', subtopics: ['Load Balancers', 'Caching', 'Databases'] },
  { id: 4, title: 'Patterns', subtopics: ['Microservices', 'Event-Driven', 'CQRS'] },
];

function App() {
  const [selectedTopic, setSelectedTopic] = useState('Introduction');

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
              borderRight: '1px solid #e5e7eb',
            },
          }}
        >
          {/* Sidebar Header */}
          <Box
            sx={{
              p: 3,
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MenuBookIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                System Design
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
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
                      onClick={() => setSelectedTopic(topic.title)}
                      sx={{
                        px: 3,
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: 'rgba(37, 99, 235, 0.05)',
                        },
                      }}
                    >
                      <ListItemText
                        primary={topic.title}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          color: selectedTopic === topic.title ? 'primary.main' : 'text.primary',
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
                          py: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(37, 99, 235, 0.05)',
                          },
                        }}
                      >
                        <ListItemText
                          primary={subtopic}
                          primaryTypographyProps={{
                            fontSize: '0.875rem',
                            color: selectedTopic === subtopic ? 'primary.main' : 'text.secondary',
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
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Master System Design
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.25rem',
                  color: 'text.secondary',
                  maxWidth: '600px',
                }}
              >
                Learn how to design scalable, reliable, and efficient systems from the ground up.
                A comprehensive guide for engineers and architects.
              </Typography>
            </Box>

            {/* Current Topic Content */}
            <Box
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 4,
                border: '1px solid #e5e7eb',
              }}
            >
              <Typography variant="h2" sx={{ mb: 3 }}>
                {selectedTopic}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Welcome to the System Design course! This is Phase 1 - the foundation of our
                book-style learning platform.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                In future phases, this content area will be populated with comprehensive lessons,
                interactive diagrams, code examples, and real-world case studies.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Select a topic from the sidebar to navigate through the course content.
              </Typography>
            </Box>

            {/* Footer Note */}
            <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #e5e7eb' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                Phase 1: Foundation Complete ✓ • Built with React + MUI
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
