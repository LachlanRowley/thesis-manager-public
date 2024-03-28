"use client";
import Post, { PostProps } from "../../components/Post";
import styles from "./page.module.css";
import { Stack, Box } from "@mui/material";
import TitlebarWithSearch from "../../components/TitlebarWithSearch";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function StuAllProjects() {
  const [data, setData] = useState([]);

  //Init filter to empty string
  const [disciplineFilter, setDisciplineFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const getData = async () => {
    try {
      fetch("/api/projects/getProjects", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getSearchData = async () => {
    try {
      fetch(
        "/api/projects/filterProjects?searchString=" +
          searchFilter +
          "&disciplineString=" +
          disciplineFilter,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Search = " + searchFilter);
          console.log(data);
          setData(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //On selecting a subject from the dropdown, trigger this function to set the filter for the data
  const handleSearchButton = (disciplineFilter, textFilter) => {
    //setDisciplineFilter(disciplineFilter);
    //console.log("Discipline: " + disciplineFilter);
    //console.log("Search: " + textFilter);

    getSearchData();
  };

  //Variable to hold filtered data

  //!!!!!!!!!!!! TEMPORARILY USING project_type TO FILTER, INSTEAD OF DISCIPLINE!!!!!!!!!!!!!

  const filteredData = data.filter((item) =>
    item.project_type.includes(disciplineFilter)
  );
  //Filter by search terms as well

  return (
    <>
      <div>
        <main>
          <TitlebarWithSearch
            searchFilter={searchFilter}
            handleSearchButton={handleSearchButton}
            setSearchFilter={setSearchFilter}
            disciplineFilter={disciplineFilter}
            setDisciplineFilter={setDisciplineFilter}
          />
          <Box sx={{ marginLeft: "10%", marginRight: "10%", paddingTop: "2%" }}>
            <Stack>
              {data.map((post) => (
                <div key={post.id} className={styles.project_card}>
                  <Post post={post} showSelectButton={false} />
                </div>
              ))}
            </Stack>
          </Box>
        </main>
      </div>
    </>
  );
}
