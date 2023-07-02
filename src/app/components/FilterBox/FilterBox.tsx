"use client";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  Rating,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import styles from "./FilterBox.module.scss";
import {
  AiFillCaretRight,
  AiOutlineCaretDown,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { useState } from "react";

import { FilterDataType, SortType } from "@/app/service/moviesService";
import dynamic from "next/dynamic";

const genresForFilter = [
  { id: 1, name: "Action", active: false },
  { id: 2, name: "Adventure", active: false },
  { id: 3, name: "Aniamation", active: false },
  { id: 4, name: "Comedy", active: false },
  { id: 5, name: "Crime", active: false },
  { id: 6, name: "Documentary", active: false },
  { id: 7, name: "Drama", active: false },
  { id: 8, name: "Family", active: false },
  { id: 9, name: "Fantasy", active: false },
  { id: 10, name: "History", active: false },
  { id: 11, name: "Music", active: false },
  { id: 12, name: "Mystery", active: false },
  { id: 13, name: "Romance", active: false },
  { id: 14, name: "Science Fiction", active: false },
  { id: 15, name: "Thriller", active: false },
  { id: 16, name: "War", active: false },
  { id: 17, name: "Western", active: false },
];

const CustomFontTheme = createTheme({
  typography: {
    fontSize: 22,
  },
});

type FilterBoxProps = {
  title: string;
  getFilteredMovies: (data: FilterDataType) => Promise<void>;
};

const FilterBox = ({ title, getFilteredMovies }: FilterBoxProps) => {
  const [showSort, setShowSort] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [genres, setGenres] = useState(genresForFilter);
  const [filterData, setFilterData] = useState<FilterDataType>({
    sortBy: "popularity.desc",
    vote: 5,
    page: 1,
    genres: [],
  });

  const toggleSort = () => {
    setShowSort(!showSort);
  };
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const onClickSearch = () => {
    setDisabled(true);
    getFilteredMovies(filterData);
  };

  const onToggleGenres = (id: number) => {
    const newGenres = genres.map((genre) => {
      if (genre.id === id) {
        genre.active = !genre.active;
        return genre;
      }
      return genre;
    });
    setGenres(newGenres);
    const activeGenres = newGenres
      .filter((genre) => genre.active)
      .map((item) => item.name);
    setFilterData({ ...filterData, genres: activeGenres });
    disabled && setDisabled(false);
  };

  const onSetFilters = (data: FilterDataType) => {
    setDisabled(false);
    setFilterData(data);
  };

  return (
    <ThemeProvider theme={CustomFontTheme}>
      <div className={styles.filter_box_content}>
        <h2>{title}</h2>
        <div className={styles.sort_box}>
          <div className={styles.top_sort_content} onClick={toggleSort}>
            <h3>Sort</h3>
            {showSort ? (
              <AiOutlineCaretDown color="white" />
            ) : (
              <AiFillCaretRight color="white" />
            )}
          </div>
          {showSort && (
            <div className={styles.down_sort_content}>
              <span>Sort Results By</span>

              <FormControl fullWidth className={styles.form_control}>
                <Select
                  sx={{
                    color: "white",
                    border: "1px solid grey",
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterData.sortBy}
                  onChange={(e) =>
                    onSetFilters({
                      ...filterData,
                      sortBy: e.target.value as SortType,
                    })
                  }
                >
                  <MenuItem value={"popularity.asc"}>
                    Popularity ascending
                  </MenuItem>
                  <MenuItem value={"popularity.desc"}>
                    Popularity descending
                  </MenuItem>
                  <MenuItem value={"vote_average.asc"}>
                    Rating ascending
                  </MenuItem>
                  <MenuItem value={"vote_average.desc"}>
                    Rating descending
                  </MenuItem>
                  <MenuItem value={"primary_release_date.asc"}>
                    Release date ascending
                  </MenuItem>
                  <MenuItem value={"primary_release_date.desc"}>
                    Release date descending
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </div>
        <div className={styles.filter_box}>
          <div className={styles.top_sort_content} onClick={toggleFilter}>
            <h3>Filters</h3>
            {showFilter ? (
              <AiOutlineCaretDown color="white" />
            ) : (
              <AiFillCaretRight color="white" />
            )}
          </div>
          {showFilter && (
            <div className={styles.down_filter_content}>
              <div className={styles.filter_radio}>
                <FormControl
                  sx={{
                    color: "grey",
                  }}
                >
                  <div className={styles.label_info}>
                    <FormLabel
                      sx={{
                        color: "grey",
                      }}
                      id="demo-radio-buttons-group-label"
                    >
                      Show Me
                    </FormLabel>
                    <Tooltip
                      sx={{
                        color: "grey",
                      }}
                      title="Log in to filter items you've watched."
                    >
                      <IconButton>
                        <AiOutlineExclamationCircle />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Everything"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Movies I Haven't seen"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Movies I Haven seen"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={styles.filter_genres_container}>
                Genres
                <div className={styles.filter_genres}>
                  {genres.map((genre) => {
                    return (
                      <div
                        key={genre.id}
                        className={
                          genre.active
                            ? styles.active_genres_box
                            : styles.genres_box
                        }
                        onClick={() => onToggleGenres(genre.id)}
                      >
                        {genre.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.filter_rate}>
                Minimum User Votes
                <Rating
                  sx={{
                    color: "Highlight",
                  }}
                  size="large"
                  name="customized-10"
                  max={10}
                  value={filterData.vote}
                  onChange={(e, newValue) =>
                    onSetFilters({ ...filterData, vote: Number(newValue) })
                  }
                />
              </div>
            </div>
          )}
        </div>
        {!disabled && (
          <button className={styles.search_button} onClick={onClickSearch}>
            Search
          </button>
        )}
      </div>
    </ThemeProvider>
  );
};

export default dynamic(() => Promise.resolve(FilterBox), { ssr: false });
