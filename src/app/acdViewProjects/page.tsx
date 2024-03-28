"use client";
import Post, { PostProps } from "../../components/Post";
import styles from "./page.module.css";
import { Stack, Box } from "@mui/material";
import TitlebarWithSearch from "../../components/TitlebarWithSearch";
import { useEffect, useState } from "react";

//Get academic's ID
import {getCurrentUser} from "../../frontendUtils/getCurrentUser";

export default function ProjectList() {
  //Get auth details
const [userLoginStatus, setUserLoginStatus] = useState('');
const [data, setData] = useState([]);

useEffect(() => {
  getCurrentUser()
    .then((result) => {
      setUserLoginStatus(result.uni_id);
    })
    .catch((error) => {
      console.log(error);
    });
}, []); // Empty array means this useEffect will run once on mount

useEffect(() => {
  if (userLoginStatus) { // Only run if userLoginStatus is not empty
    getData();
  }

  async function getData() {
    try {
      const response = await fetch("api/projects/getAcademicProjects?idString=" + userLoginStatus, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }
}, [userLoginStatus]); // This useEffect will run whenever userLoginStatus changes


  //Init filter to empty string
  const [disciplineFilter, setDisciplineFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');



  const getSearchData = async() =>	{
  	try	{
		fetch("/api/projects/filterProjects?searchString=" + searchFilter + "&disciplineString=" + disciplineFilter, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
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
  const handleSearchButton = (disciplineFilter, textFilter) =>	{
	getSearchData();
  };
  



 // const filteredData = data.filter(item => item.project_type.includes(disciplineFilter));
 const filteredData = null;
  //Filter by search terms as well

  return (
    <>
      <div>
        <main>
          <TitlebarWithSearch searchFilter={searchFilter} handleSearchButton={handleSearchButton} setSearchFilter={setSearchFilter} disciplineFilter={disciplineFilter} setDisciplineFilter={setDisciplineFilter}/>
          <Box sx={{ marginLeft: "10%", marginRight: "10%", paddingTop: "2%" }}>
          {userLoginStatus
			  ? (
				  <Stack>
					{data.map((post) => (
						<div key={post.id} className={styles.project_card}>
						<Post post={post} />
						</div>
					))}
				  </Stack>
				)
			  : <h1>Not Logged In!</h1>
		  }

          </Box>
        </main>
      </div>
    </>
  );
}
