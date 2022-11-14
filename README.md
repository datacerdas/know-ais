![UN Big Data Hackathon 2022](https://unstats.un.org/bigdata/assets/img/hackathon-web-banner.png "UNBDH 2022")

# KnowAIS: Self-Service Analytics Platform for Global Shipping Network

[![KnowAIS Video Teaser](https://i.imgur.com/F5l2qYb.png)](https://clipchamp.com/watch/xzwQCSxdgYc?utm_source=share&utm_medium=social&utm_campaign=watch)

<!-- *** -->

## Contributors
- [Ignatius Aditya Setyadi](https://www.linkedin.com/in/adityasetyadi/) *BPS - Statistics Indonesia*
- [Amanda Pratama Putra]() *Tokopedia*
- [Wismu Sunarmodo]() *BRIN - National Research and Innovation Agency*
- [Sugiri]() *BPS - Statistics Indonesia*
- [Amin Rois Sinung Nugroho]() *BPS - Statistics Indonesia*

## Objectives
* Develop decision support system to process AIS Big Data in timely manner through insight generation and monitoring of global shipping network.
* Conduct analysis using Data Science and Big Data related to the relationship between global shipping networks and statistical indicators of the world economy.

## Data

### AIS data

AIS Data is made up of tons of data that is captured on a daily basis. Initial filtration is needed to get the most needed information during the process, ensuring that the feature selection process is carried out in the best possible way.
For the purpose of proof of concept and increasing the processing time during the hackathon, we did sampling dataset by maintaining vessel coverage >80%.


### Port data

Data taken from the World Food Programme (WFP) and filtered only by area.
The designated h3 resolution 5 along its hex ring from its centroid point is then defined as the polygon to be utilized for trajectory identification.

### Official statistics

The UNCTAD-Eora Global Value Chain (GVC) database offers global coverage (189 countries and a “Rest of World” region) and a time series from 1990 to 2018 of the key GVC indicators: foreign value added (FVA), domestic value added (DVA) and indirect value added (DVX). 
Results from 1990 to 2017 are generated from EORA Multi-Region Input-Output tables (MRIOs). Results for 2016-2017 are provisional "beta" results and will be revised in early 2018. Results for 2018 are nowcasted based on the IMF World Economic Outlook.

## Scope

Baltic and Black Seas are picked as the targeted zone to analyze the impact of the Ukraine-Russia war.

The selection across the zone is made using H3 resolution 1 and its hex ring, which consists of 14 areas, in the period of January to June 2022 (~10M records after sampling), as well as the same month period from 2021 (~9M records) for comparison.

## Big Data processing

### Initial filtration
For better performance dealing with Big Data, initial filtration is performed on selected columns, h3_list in resolution 1, and date range

### Port activity identification
Identification activity in the port area is done by joining with the same h3 index resolution 5 between AIS Data and Ports. This approach has proven produced better performance than scripts using GIS features such as ST_WITHIN, etc. 
It also reduces the need to define specific coordinates locations in order to manually generate port polygon area.

### Speed & distance calculation
The distance is measured using the Haversine formula and carried out between movements, then the speed calculation is carried out afterwards.
The distance is carried out in km, as well as the speed produced in km per hour (kmh)

### Anchored identification
Anchored identification is tracked from several conditions, mainly based on the length of time in port and the time difference which tends to be longer than the next emergence, which is currently limited to a minimum of ± 2.5 hours.

### Trajectory result
```id_shipping  |  origin_port  |  destination_port  |  avg_speed  |  distance  |  vessel_attributes```


### Shipping lineage
The trajectory results contain the shipping lineage attributes, namely average speed, distance, and vessel identity such as mmsi, type, width, length, country, etc. 
The distance is calculated by aggregating each movement of the vessel during the trip rather than simply calculated directly from the place of origin to the destination.


## Use case
* Route Recommendation
* Country & port clustering 
* Country & port ranking
* AIS2Vec: Country & Port Vector Embedding based on AIS Shipping Network


## About the repository

### Repo structure

    .
    ├── notebooks
    │   ├── 00_Data_preparation.ipynb
    │   └── 01_Sampling_AIS.ipynb
    │   └── 02_Trajectory_AIS_pyspark.ipynb
    │   └── 02a_Trajectory_AIS_pandas.ipynb
    │   └── 03_Inject_AIS_result.ipynb
    │   └── 04_Graph_Analysis_Port.ipynb
    05_Graph_Analysis_Country.ipynb
    │           The Jupyter Notebooks that we created during the processing
    │
    ├── results
    │   └── [...]
    │           The key figures that we produced
    │
    ├── presentation
    │   ├── KnowAIS_ Self-Service Analytics Platform for Global Shipping Network.pdf
    │   └── KnowAIS by Cerdasdata - UNBDH 2022.mp4
    │           The result presentation
    │
    └── platform
        ├── [...]
                KnowAIS platform, build with SolidJS


## Limitation

* Neo4j features for open source community edition.
* AIS Data access at UNGP. Only able to use small sample size. It might impact the accuracy of OD matrix.
* Availability data to enrich knowledge graph, along with the commitment of the availability
* MapBox free private API token which only limits 50k hit/ months 


## Roadmap

* Platform developments which enables more enhance decision support system.
* Integrate with more available data, mainly from official statistics and other relevant data. 
* Improve the backend integration and study the best practice architecture that might sustain for a long time and easy to scale using cloud architecture.
* Provide more broadened and advanced analytics which will enrich data-driven solution.
* Focus as the measurement platform on controlling SDGs Goals


## Appendix
Code Repository
* https://github.com/datacerdas/know-ais 
* https://code.officialstatistics.org/datacerdas/know-ais 

S3 Bucket Trajectory Result Repository
* s3://know-ais/data/ 

KnowAIS Platform
* https://know-ais.vercel.app/ 
* https://know-ais.datacerdas.id/

KnowAIS Presentation
* https://bit.ly/KnowAIS-Slide 
* https://clipchamp.com/watch/xzwQCSxdgYc 



