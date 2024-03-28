"use client";
import Post, { PostProps } from "./Post";
import styles from "./SelectFromList.module.css";
import { Stack, Box } from "@mui/material";
import TitlebarWithSearchNClose from "./TitlebarWithSearchNClose";
import { useEffect, useState } from "react";

export type SelectFromListProps = {
  onClose: () => void;
  onSelectProject?: (project: PostProps) => void;
};

export default function SelectFromList({
  onClose,
  onSelectProject,
}: SelectFromListProps) {
  const [data, setData] = useState([]);

  const handleCloseModal = () => {
    onClose();
  };

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

  // const handleCloseModal = () => {
  //   // Assuming you have some state logic to control the modal's visibility.
  //   // If not, add it.
  //   setOpenSelectFromList(false);
  // };

  return (
    <>
      <div>
        <main>
          <TitlebarWithSearchNClose
            searchFilter={searchFilter}
            handleSearchButton={handleSearchButton}
            setSearchFilter={setSearchFilter}
            disciplineFilter={disciplineFilter}
            setDisciplineFilter={setDisciplineFilter}
            handleClose={handleCloseModal}
          />
          <Box sx={{ marginLeft: "10%", marginRight: "10%", paddingTop: "2%" }}>
            <Stack>
              {data.map((post) => (
                <div key={post.id} className={styles.project_card}>
                  <Post
                    post={post}
                    onSelectProject={onSelectProject}
                    showSelectButton={true}
                  />
                </div>
              ))}
            </Stack>
          </Box>
        </main>
      </div>
    </>
  );
}
