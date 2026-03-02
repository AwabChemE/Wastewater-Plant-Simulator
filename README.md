# Municipal Wastewater Treatment Simulator (Phase 1)

**Developer:** Awab Abdallah (@AwabChemE)  
* **Project Supervisor:** <b>[Dr Taj Alasfia M Barakat](https://lms.uofk.edu/user/profile.php?id=6065)</b>
**Institution:** University of Khartoum, Department of Chemical Engineering  

![Simulator Interface](https://github.com/AwabChemE/Wastewater-Plant-Simulator/blob/main/Simulator%20Interface.png)

##  Project Overview
This repository contains a custom, dynamic computational simulator developed to model the secondary biological treatment phase of a municipal wastewater treatment plant. The design basis is specifically localized to model a decentralized, neighborhood-scale facility ($1000~m^3/day$) to address post-conflict infrastructure rehabilitation needs in Khartoum, Sudan.

The computational engine utilizes a first-order Continuous Stirred-Tank Reactor (CSTR) mathematical model to calculate Biochemical Oxygen Demand (BOD) removal, dynamic unit sizing, and overall environmental compliance.

##  Key Computational Features
* **Dynamic Operational Modes:** Instantly toggle between "Rating Mode" (evaluating existing tanks) and "Specification-Driven Design" (targeting specific HRTs or Effluent limits).
* **Automated Architectural Sizing:** The algorithm automatically integrates physical manufacturing constraints. If a required volume exceeds standard highway transportation limits ($40.0~m^3$), the software automatically redesigns the plant architecture into parallel operational units.
* **Real-Time Compliance Tracking:** Continuously calculates Overall Removal Efficiency to ensure effluent meets strict environmental discharge benchmarks.

##  Repository Structure
To ensure the simulator functions correctly, the core files must be kept together in the same directory.
* `Simulator V0.112.html` - The front-end user interface.
* `style.css` - The styling and layout framework.
* `JavaScript MathEngine.js` - The core algorithmic engine containing the CSTR mass balance logic.
* `SuperPro_Validation_AwabChemE.spf` - The native SuperPro Designer file used for rigorous kinetic validation.

##  How to Run the Simulator
This simulator is designed for rapid deployment and accessibility. No local compilers, servers, or external dependencies are required.
1. Download or clone this repository to your local machine.
2. Ensure `Simulator V0.112.html`, `style.css`, and `JavaScript MathEngine.js` are located in the **exact same folder**.
3. Double-click `Simulator V0.112.html` to open the simulator in any modern web browser (Chrome, Edge, Firefox, Safari).

##  Commercial Validation
The custom mathematical algorithms within `script.js` were rigorously validated against **SuperPro Designer**. A multi-point validation study tracking biological decay across 8, 12, and 16-hour Hydraulic Retention Times (HRTs) yielded a stable, conservative variance of less than 4% between this software and the commercial industry standard. 

*(See the included `.spf` file to check the validation flowsheet).*

##  Future Scope (Phase 2)
For the final fifth-year expansion of this project, the computational architecture will be transitioned into a robust **C++ environment**. This will allow the engine to handle the significantly higher computational loads and complex iterative loops required for secondary settling dynamics, advanced sludge digestion, and comprehensive global energy balances.

## 🏛️ Acknowledgments & Ownership
* **Project Supervisor:** <b>[Dr Taj Alasfia M Barakat](https://lms.uofk.edu/user/profile.php?id=6065)</b> (Who provided the strategic vision for expanding the simulator's capabilities into comprehensive mass/energy balances and cost estimation).
* **License:** Released under the [MIT License](LICENSE) - free to use, modify, and distribute.
