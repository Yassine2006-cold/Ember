# EMBER data provenance and cloud loading notes

## Files
- `nasa_flame_spread.csv`: five rows manually transcribed approximately from NASA NTRS Figure 11. Four rows are the paper's 1g PMMA pyrolysis-front series; the separate Saffire II microgravity reference uses flame-tip tracking and a different test configuration.
- `saffire-spread.csv`: selected Saffire flight and ground-reference values supplied in the companion dashboard export. Rates should be read with their sample size, material, flow configuration, and flight context; they are not a controlled material ranking. Saffire-I figures 1.8 and 1.3 mm/s are directly stated in NASA NTRS 20170008805. Other flight values in the supplied extract should be cross-checked against the corresponding NASA tables/figures before formal quantitative reuse.
- `flex-limits.csv`: FLEX subset from the companion dashboard export. For O2/N2, the NASA-supported study reports LOI 0.12 methanol and 0.15 heptane. With CO2 dilution it reports approximately 0.14 and 0.17, respectively; these extra values are described in the dashboard but are not yet separate CSV rows.
- `same-detection.csv`: SAME selected material outcomes from the companion dashboard export. The NASA/NIST study reports the ISS detector would not have alarmed for over half of Kapton tests and two-thirds of Teflon tests. These fractions describe tests, not onboard fire-event probabilities.

## Primary sources
- NASA NTRS, Results of Large-Scale Spacecraft Flammability Tests (Saffire I–II): https://ntrs.nasa.gov/api/citations/20170008805/downloads/20170008805.pdf
- NASA NTRS, Fire Safety Implications of Preliminary Results from Saffire IV and V: https://ntrs.nasa.gov/api/citations/20210011521/downloads/ICES%202021-266%200503-2021%20final.pdf
- NASA NTRS, pressure-dependent PMMA flame spread paper: https://ntrs.nasa.gov/api/citations/20200000557/downloads/20200000557.pdf
- NASA NTRS, FLEX cool-flame technical report: https://ntrs.nasa.gov/api/citations/20140006750/downloads/20140006750.pdf
- FLEX journal paper: https://link.springer.com/article/10.1007/s12217-014-9372-2
- SAME detector performance paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC7918997/
- NASA PSI Saffire-I record: https://psi.nasa.gov/physci/repo/data/investigations/PSI-98
- NASA PSI SAME record: https://psi.nasa.gov/physci/repo/data/investigations/PSI-102

## Interpretation guardrails
Do not describe the Saffire range as a controlled same-fuel test. Do not calculate a single “Earth vs microgravity” multiplier from mixed materials/configurations. Do not treat the 0.09 mm/s Saffire II reference in the pressure paper as the same measurement method as the 1g PMMA pyrolysis-front series. FLEX oxygen limits apply to specific droplet fuel/atmosphere tests, not a universal cabin oxygen threshold. SAME detector failure fractions are counts among tested smoke trials, not probabilities of missing an actual vehicle fire.

## BigQuery
`bigquery-schema.json` matches `nasa_flame_spread.csv`. For the three companion tables, use CSV schema autodetection, then inspect the inferred types and NULLs. The sandbox automatically expires tables after 60 days. No cloud project resources were created from the workspace.

## SI disclosure
The supplied companion dashboard was created with AI assistance (Claude, Anthropic). This combined project was further edited with ChatGPT (OpenAI). SI assisted with UI/code, explanations, and transcription/integration of published values; it did not perform NASA experiments or generate measurements. Values and inferences are identified with source links and limitations. No SI-generated images, video, or audio are used.
