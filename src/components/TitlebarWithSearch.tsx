"use client";

import * as React from "react";
import {
  createTheme,
  useTheme,
  ThemeProvider,
  Theme,
} from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import styles from "./Titlebar.module.css";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const subjectsList = [
  "Software",
  "Electrical",
  "Mechanical",
  "Civil",
  "Electronic",
  "Mechatronic",
];

function getStyles(name: string, subjectName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      subjectName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TitlebarWithSearch({handleSearchButton, searchFilter, setSearchFilter, disciplineFilter, setDisciplineFilter}) {

  
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#a6192e",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#d6d2c4",
      },
    },
  });

  const handleSearchChange = (event: React.ChangeEvent<{value: unknown}>) =>	{
	setSearchFilter(event.target.value);
  }

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  	setDisciplineFilter(event.target.value as string);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "primary.main", color: "#FFFFFF" }}>
        <div id={styles.Ribbon_container}>
          <h1>All Projects</h1>

          <div id={styles.Ribbon_searchbar_container}>
            <TextField
              label="Search projects..."
              type="search"
              variant="filled"
              color="primary"
		    onChange={handleSearchChange}
            />

		  <FormControl>
			<Select
				sx={{color: "#FFFFFF"}}
				displayEmpty
				value={disciplineFilter}
				onChange={handleSelectChange}
				input={<OutlinedInput />}
				MenuProps={MenuProps}
				inputProps={{ "aria-label": "Without label" }}
			>

				<MenuItem key={"All"} value={""}>All</MenuItem>
				<MenuItem	key={"Software"} value={"Software"}>Software</MenuItem>
				<MenuItem key={"Electrical"} value={"Electrical"}>Electrical</MenuItem>
				<MenuItem key={"Mechanical"} value={"Mechanical"}>Mechanical</MenuItem>
				<MenuItem key={"Civil"} value={"Civil"}>Civil</MenuItem>
				<MenuItem key={"Electronic"} value={"Electronic"}>Electronic</MenuItem>
				<MenuItem key={"Mechatronic"} value={"Mechatronic"}>Mechatronic</MenuItem>
			</Select>
		</FormControl>
		 <IconButton aria-label="Search" color="secondary" onClick={handleSearchButton}>
		 	<SearchIcon />
		</IconButton>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}
