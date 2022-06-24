import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Dashboard from './Dashboard';
import FormPropsTextFields from './addProp';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Dashboard />} />
        <Route path = '/addproperty' element = {<FormPropsTextFields />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>,
  );
