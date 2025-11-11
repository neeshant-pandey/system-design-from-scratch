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
                      onClick={() => setSelectedTopic(topic.title)}
                      sx={{
                        px: 3,
                        py: 1.25,
                        mx: 2,
                        my: 0.5,
                        borderLeft: selectedTopic === topic.title ? '2px solid #e8e8e8' : '2px solid transparent',
                        backgroundColor: selectedTopic === topic.title ? 'rgba(232, 232, 232, 0.05)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(232, 232, 232, 0.08)',
                          borderLeft: '2px solid #e8e8e8',
                        },
                      }}
                    >
                      <ListItemText
                        primary={topic.title}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          fontSize: '0.9375rem',
                          color: selectedTopic === topic.title ? '#f5f5f5' : 'text.secondary',
                          letterSpacing: '-0.01em',
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
                          py: 0.875,
                          mx: 2,
                          my: 0.25,
                          borderLeft: selectedTopic === subtopic ? '1px solid rgba(232, 232, 232, 0.3)' : '1px solid transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(232, 232, 232, 0.04)',
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
