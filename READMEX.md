![UN Big Data Hackathon 2022](https://unstats.un.org/bigdata/assets/img/hackathon-web-banner.png "UNBDH 2022")

# Shortest Path AIS Data

Arctic terns are one of very few species in the world to spend considerable parts of time every year at both poles, migrating at least 90,000 km per year between the two,<sup>[1, 2]</sup> which is the longest recorded migration of any animal. They are particularly vulnerable to climate change, with a short window to breed in their arctic range during the boreal summer, their reliance on tailwinds to support both their south- and north- bound migrations,<sup>[3]</sup> and their use of sea ice to forage in the Southern Ocean during the austral summer. Using tracking data (from breeding arctic terns caught in Greenland<sup>[1]</sup> and Sweden<sup>[4]</sup>), and Iceland, we are interested in investigating how predicted changes over the next 100 years will impact the winds that migrating arctic terns rely on, and how the changing ice edge will affect their foraging during the non-breeding period.

1. Egevang C, Stenhouse IJ, Phillips RA, Petersen A, Fox JW, Silk JR (2010) Tracking of Arctic terns Sterna paradisaea reveals longest animal migration Proc Natl Acad Sci U S A 107:2078-2081 https://doi.org/10.1073/pnas.0909493107
2. Fijn RC, Hiemstra D, Phillips RA, van der Winden J (2013) Arctic Terns Sterna paradisaea from The Netherlands migrate record distances across three oceans to Wilkes Land, East Antarctica Ardea 101:3-12 https://doi.org/10.5253/078.101.0102
3. Hromádková T, Pavel V, Flousek J, Briedis M (2020) Seasonally specific responses to wind patterns and ocean productivity facilitate the longest animal migration on Earth. Mar Ecol Prog Ser 638:1-12. https://doi.org/10.3354/meps13274
4. Alerstam, T, Bäckman, J, Grönroos, J, Olofsson, P, Strandberg, R (2019) Hypotheses and tracking results about the longest migration: The case of the arctic tern. Ecol Evol 9: 9511– 9531. https://doi.org/10.1002/ece3.5459

***

## Contributors
- [Joanne Morten](https://biosciences.exeter.ac.uk/staff/profile/index.php?web_id=Joanne_Morton) *(Exeter, Project Lead)*
- [Lucy Hawkes](https://biosciences.exeter.ac.uk/staff/profile/index.php?web_id=Lucy_Hawkes) *(Exeter, Project Lead)*
- Will Thurston *(Met Office, Project Lead)*

- Pearce Buchanan *(Liverpool)* :octocat: [pearseb](https://github.com/pearseb)
- [Isolde Glissenaar](https://research-information.bris.ac.uk/en/persons/isolde-a-glissenaar) *(Bristol)* :octocat: [IsoldeGlissenaar](https://github.com/IsoldeGlissenaar)
- [Noam Vogt-Vincent](https://www.earth.ox.ac.uk/people/noam-vogt-vincent/) *(Oxford)* :octocat: [nvogtvincent](https://github.com/nvogtvincent)
- [Daniel Williams](https://emps.exeter.ac.uk/mathematics/staff/dw569) *(Exeter)* :octocat: [daw538](https://github.com/daw538)
- [Ned Williams](https://emps.exeter.ac.uk/mathematics/staff/nw432) *(Exeter)* :octocat: [nedcw](https://github.com/nedcw)
- [Shannon Williams](https://compass.blogs.bristol.ac.uk/students/shannon-williams/) *(Bristol)* :octocat: [shannon-wms](https://github.com/shannon-wms)
- [Aleksandra Zaforemska](https://research.ncl.ac.uk/geospatial-systems/phdresearchers/profiles/aleksandrazaforemska.html) *(Newcastle)* :octocat: [alekszaf](https://github.com/alekszaf)

## What was done

Our project split into three different groups to focus on different factors that may affect Arctic Terns:

- Wind (Dan, Ned, Shannon) 
- Sea Ice (Aleksandra, Isolde)
- Productivity (Noam, Pearce)

### How we approached the problem and why

[...]

### Data we used and how to obtain this

We used data from the [Coupled Model Intercomparison Project Phase 6 (CMIP6)](http://www.wcrp-climate.org/wgcm-cmip/wgcm-cmip6) project to conduct our analysis. Experiments used included the core CMIP set of experiments, [DAMIP](http://damip.lbl.gov) (attribution of components of climate change) and [ScenarioMIP](https://www.cesm.ucar.edu/projects/CMIP6/ScenarioMIP/) (predictions for future climate change scenarios)

The data used in our project can be downloaded directly from the CMIP 6 [data portal](https://esgf-node.llnl.gov/search/cmip6/), whilst the individual experiments and files used can be found in the iPython notebooks contained within this repository. Most of the analysis made use of the UKESM GCM.

### What we did during the hackathon

* [...]
* [...]
* [...]

### Outcomes

* [...]
* [...]
* [...]

## About this repo

There are further `README` files in key directories.

### Key files

* [...]
* [...]
* [...]

### How to reproduce our outputs

1. [...]
2. [...]
3. [...]

### Repo structure

    .
    ├── notebooks
    │   ├── [...].ipynb
    │   └── [...].ipynb
    │           The Jupyter Notebooks that we created
    │
    ├── code
    │   ├── [...].py
    │   └── [...].py
    │           Any code (Python or otherwise) that we created that doesn't
    │           sit within a Notebook
    │
    ├── results
    │   ├── [...].pdf
    │   └── [...].png
    │           The key figures that we produced
    │
    ├── data
    │   ├── raw_data
    │   │       Any data we used that didn't come from JASMIN
    │   │
    │   └── processed_data
    │           Any output data that we produced
    │
    ├── environment.yml
    └── environment_frozen.yml
            The libraries and versions that we used

## Next steps for our project

* [...]
* [...]
* [...]