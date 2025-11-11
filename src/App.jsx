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
      main: '#facc15', // Yellow
    },
    secondary: {
      main: '#ef4444', // Red
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#f5f5f5', // Off-white
      secondary: '#facc15', // Yellow
    },
    warning: {
      main: '#ef4444', // Red
    },
    info: {
      main: '#e8e8e8', // Light off-white
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
              borderRight: '5px solid #facc15',
              boxShadow: '8px 0 0 0 #facc15',
            },
          }}
        >
          {/* Sidebar Header */}
          <Box
            sx={{
              p: 3,
              borderBottom: '5px solid #facc15',
              backgroundColor: '#000',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MenuBookIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#f5f5f5' }}>
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
                        border: selectedTopic === topic.title ? '3px solid #facc15' : '3px solid transparent',
                        backgroundColor: selectedTopic === topic.title ? '#facc15' : 'transparent',
                        boxShadow: selectedTopic === topic.title ? '4px 4px 0 0 #f5f5f5' : 'none',
                        '&:hover': {
                          backgroundColor: '#facc15',
                          border: '3px solid #facc15',
                          boxShadow: '4px 4px 0 0 #f5f5f5',
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
                          border: selectedTopic === subtopic ? '2px solid #ef4444' : '2px solid transparent',
                          backgroundColor: selectedTopic === subtopic ? '#ef4444' : 'transparent',
                          '&:hover': {
                            backgroundColor: '#ef4444',
                            border: '2px solid #ef4444',
                            boxShadow: '3px 3px 0 0 #f5f5f5',
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
                  color: '#facc15',
                  textShadow: '5px 5px 0 #ef4444, 10px 10px 0 #e8e8e8',
                }}
              >
                Master System Design
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#ef4444',
                  border: '4px solid #000',
                  boxShadow: '8px 8px 0 0 #facc15',
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
                border: '5px solid #facc15',
                boxShadow: '10px 10px 0 0 #ef4444',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 3,
                  color: '#facc15',
                  textShadow: '3px 3px 0 #e8e8e8',
                }}
              >
                {selectedTopic}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#f5f5f5' }}>
                Welcome to the System Design course! This is Phase 1 - the foundation of our
                book-style learning platform.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#f5f5f5' }}>
                In future phases, this content area will be populated with comprehensive lessons,
                interactive diagrams, code examples, and real-world case studies.
              </Typography>
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: '#e8e8e8',
                  border: '4px solid #000',
                  boxShadow: '6px 6px 0 0 #ef4444',
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
                borderTop: '5px solid #facc15',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  backgroundColor: '#facc15',
                  border: '3px solid #000',
                  boxShadow: '5px 5px 0 0 #f5f5f5',
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
