// ----------------------------------------------------------------------

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root:{
          color: theme.palette.mode === 'dark'?"#FFF":"#141414"
        },
        paragraph: {
          // color: theme.palette.mode === 'dark'?"#FFF":"#141414",
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}
