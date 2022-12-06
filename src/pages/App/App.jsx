import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import SearchPage from "../SearchPage/SearchPage";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import TopStoryPage from "../TopStoryPage/TopStoryPage";
import SavedStoriesPage from "../SavedStoriesPage/SavedStoriesPage";
import * as newsAPI from "../../utilities/news-api";
import { StoreSharp } from "@mui/icons-material";

function App() {
  const [user, setUser] = useState(getUser());
  const [topStories, setTopStories] = useState([]);
  const [savedStories, setSavedStories] = useState([]);
  const [searchStories, setSearchStories] = useState([]);

  useEffect(function () {
    async function getStory() {
      const stories = await newsAPI.topStories();
      setTopStories(stories);
    }
    async function saveStory(){
      const stories = await newsAPI.getSavedStories()
      setSavedStories(stories)
    }
    getStory(),
    saveStory()
  },[])

  async function getSearch(query) {
    const stories = await newsAPI.searchStories(query);
    setSearchStories(stories.articles);
  }

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/stories/top"
              element={<TopStoryPage topStories={topStories.articles} user={user} />}
            />
            <Route
              path="/stories/saved"
              element={
                <SavedStoriesPage savedStories={savedStories} />
              }
            />
            <Route
              path="/search"
              element={
                <SearchPage
                  getSearch={getSearch}
                  searchStories={searchStories}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
