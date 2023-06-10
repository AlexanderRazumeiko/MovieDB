"use client";

import { MoviesListType, PesonsListType } from "@/app/service/moviesService";
import PerfomansCard from "./PerfomansCard/PerfomansCard";
import styles from "./PerfomansPanel.module.scss";
import React from "react";

type PerfomansPanelProps = {
  title: string;
  moviesList?: MoviesListType[];
  personsList?: PesonsListType[];
  width?: number;
};

const PerfomansPanel = ({
  title,
  moviesList,
  personsList,
  width,
}: PerfomansPanelProps) => {
  return (
    <div className={styles.panel} style={{ width: `${width}%` || "100%" }}>
      <div className={styles.panel_tittle}>
        <h2>{title}</h2>
      </div>
      <div className={styles.panel_box}>
        <div className={styles.panel_content}>
          {moviesList?.map((item, i) => {
            return (
              <React.Fragment key={i}>
                {
                  <PerfomansCard
                    id={item.id}
                    title={item.title}
                    posterPath={item.poster_path}
                    date={item.release_date}
                    rate={item.vote_average}
                  />
                }
              </React.Fragment>
            );
          })}
          {personsList
            ?.filter((item) => item.profile_path)
            .map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {
                    <PerfomansCard
                      id={item.id}
                      title={item.name}
                      posterPath={item.profile_path || ""}
                      width={250}
                      height={350}
                    />
                  }
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PerfomansPanel;
