# Wastewater-Plant-Simulator (V0.1)

> **Version 0.1 of a decade-long project to replace commercial process bloatware. Starting today with a lightweight, 3-mode CSTR prototype to perfect the core mathematical engine.**

##  Architecture Overview
This repository contains a client-side, browser-based Continuous Stirred-Tank Reactor (CSTR) simulation engine. Designed to bypass the heavy local processing power required by legacy commercial software, this tool executes steady-state biochemical mass balances and kinetic decay algorithms instantly via pure JavaScript logic. 

Currently optimized for wastewater biological oxygen demand (BOD) removal, the engine acts as the foundational module for a larger, scalable digital twin architecture.

##  The Mathematical Engine
The simulator relies on first-order decay kinetics integrated into a steady-state CSTR mass balance. 

**The Governing Equation:**
$$C_{out} = \frac{C_{in}}{1 + k \cdot HRT}$$

Where:
* $C_{out}$ = Effluent BOD concentration (mg/L)
* $C_{in}$ = Influent BOD concentration after 30% primary clarification (mg/L)
* $k$ = First-order biological decay rate constant (default: 0.8 $day^{-1}$)
* $HRT$ = Hydraulic Retention Time (hours)

##  The 3-Mode Logic Gate
The software algorithm is structured to handle three distinct engineering scenarios, switching execution paths dynamically without requiring page reloads.

### 1. Rating Mode (Evaluate Existing Infrastructure)
Evaluates the performance capabilities of an already-built concrete reactor. 
* **Input:** Existing Tank Volume ($V$) and Inflow Rate ($Q$).
* **Output:** Calculates resulting $HRT$, predicted Effluent BOD, and Removal Efficiency.

### 2. Performance-Driven Design (Strict Compliance)
Calculates the exact physical tank dimensions required to hit a legal environmental limit.
* **Input:** Target Effluent BOD (e.g., strict 30.0 mg/L limit).
* **Output:** Back-calculates the required $HRT$ algebraically and sizes the exact Tank Volume ($V$) required to achieve it.

### 3. Specification-Driven Design (Standard Engineering Constraints)
Mirrors the logic of commercial simulation tools (like SuperPro Designer) by using standard civil engineering rules of thumb.
* **Input:** Target Residence Time ($HRT$).
* **Output:** Calculates the required Tank Volume ($V$) and predicts the resulting Effluent BOD.

##  Tech Stack & Deployment
* **Frontend UI:** HTML5 & CSS3 (Responsive, dynamic CSS class toggling).
* **Computational Backend:** Vanilla JavaScript (ES6+).
* **Execution:** 100% Client-Side. Zero server latency. 

##  5th-Year & Long-Term Roadmap
Following the strategic academic direction set for the 5th-year graduation project, future iterations will expand this single module into a full-scale plant simulator:
- [ ] Comprehensive Material and Energy Balances (حسابات المادة والطاقة) across all plant units.
- [ ] Real-time capital and operational expenditure (CAPEX/OPEX) cost estimation modules.
- [ ] Multi-unit configuration (series/parallel CSTR routing).
- [ ] Server-side execution migration (C++/Node.js) to protect proprietary algorithms.

## 🏛️ Acknowledgments & Ownership
* **Lead Developer & Systems Architect:** <b>[Awab Abdallah](https://github.com/AwabChemE)</b>
* **Academic Institution:** <b>Department of Chemical Engineering, University of Khartoum</b>
* **Project Supervisor:** <b>[Dr Taj Alasfia M Barakat](https://lms.uofk.edu/user/profile.php?id=6065)</b> (Who provided the strategic vision for expanding the simulator's capabilities into comprehensive mass/energy balances and cost estimation).
* **License:** Released under the [MIT License](LICENSE) - free to use, modify, and distribute.
