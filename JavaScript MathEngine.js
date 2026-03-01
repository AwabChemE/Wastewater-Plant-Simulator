const PRIMARY_EFF_BOD = 0.30;   
const BIO_DECAY_RATE = 0.8;     
const COMPLIANCE_LIMIT = 30.0;  

    // FUNCTION 1: The UI Controller
    function toggleMode() {
        let mode = document.getElementById('mode').value;
        let volGroup = document.getElementById('volume-input-group');
        let bodGroup = document.getElementById('target-bod-input-group');
        let hrtGroup = document.getElementById('target-hrt-input-group');

        // Hide all specific inputs first
        volGroup.classList.add('hidden');
        bodGroup.classList.add('hidden');
        hrtGroup.classList.add('hidden');

        // Show only the one matching the selected mode
        if (mode === 'rating') {
            volGroup.classList.remove('hidden');
        } else if (mode === 'design-perf') {
            bodGroup.classList.remove('hidden');
        } else if (mode === 'design-spec') {
            hrtGroup.classList.remove('hidden');
        }
        
        // Hide the result box when switching modes
        document.getElementById('resultBox').classList.add('hidden');
    }

    // FUNCTION 2: The Math Engine
    function runSimulation() {
        let mode = document.getElementById('mode').value;
        let flow = parseFloat(document.getElementById('flow').value);
        let bod_in = parseFloat(document.getElementById('bod').value);
        
        let flow_hourly = flow / 24.0;
        let primary_bod = bod_in * (1 - PRIMARY_EFF_BOD);
        let htmlOutput = ""; 

        // --- THE HELPER FUNCTION: Checks if the tank is too big to build ---
        function checkTankLimits(req_volume) {
            if (req_volume > 40) {
                let num_tanks = Math.ceil(req_volume / 40);
                let volume_per_tank = req_volume / num_tanks;
                return `
                <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-left: 5px solid #ffc107; border-radius: 5px; color: #856404; font-size: 14px; line-height: 1.5;">
                    <p style="margin: 0 0 8px 0;">⚠️ <strong>Engineering Construction Warning</strong></p>
                    <p style="margin: 0 0 8px 0;">The required liquid volume (<b>${req_volume.toFixed(2)} m³</b>) exceeds the physical manufacturing and highway transportation limits for a single prefabricated reactor unit (capped at 40.0 m³).</p>
                    <p style="margin: 0;"><strong>System Architecture Solution:</strong> To achieve this processing capacity, the plant must be designed with <b>${num_tanks} parallel CSTR units</b>, each operating with a working volume of approximately <b>${volume_per_tank.toFixed(2)} m³</b>.</p>
                </div>`;
            }
            return ""; // Returns nothing if the volume is under 40 m³
        }

        if (mode === 'rating') {
            // --- 1. RATING MODE ---
            let volume = parseFloat(document.getElementById('volume').value);
            let hrt = (flow_hourly > 0) ? (volume / flow_hourly) : 0;
            let effluent_bod = primary_bod / (1 + BIO_DECAY_RATE * hrt);
            let removal_eff = ((bod_in - effluent_bod) / bod_in) * 100;

            htmlOutput += `<p><strong>Retention Time (HRT):</strong> ${hrt.toFixed(2)} hours</p>`;
            htmlOutput += `<p><strong>Calculated Effluent BOD:</strong> ${effluent_bod.toFixed(2)} mg/L</p>`;
            htmlOutput += `<p><strong>Removal Efficiency:</strong> ${removal_eff.toFixed(1)}%</p>`;
            
            if (effluent_bod <= COMPLIANCE_LIMIT) {
                htmlOutput += `<p><strong>Status:</strong> <span class='safe'>SAFE TO DISCHARGE</span></p>`;
            } else {
                htmlOutput += `<p><strong>Status:</strong> <span class='violation'>❌ VIOLATION (Above 30 mg/L)</span></p>`;
            }

        } else if (mode === 'design-perf') {
            // --- 2. PERFORMANCE-DRIVEN DESIGN (Target BOD) ---
            let target_bod = parseFloat(document.getElementById('target-bod').value);

            if (target_bod >= primary_bod) {
                htmlOutput = `<p class='violation'>Error: Target BOD must be lower than the post-primary BOD (${primary_bod.toFixed(1)} mg/L).</p>`;
            } else {
                let req_hrt = ((primary_bod / target_bod) - 1) / BIO_DECAY_RATE;
                let req_volume = req_hrt * flow_hourly;
                let removal_eff = ((bod_in - target_bod) / bod_in) * 100;

                htmlOutput += `<p><strong>Target Effluent BOD:</strong> ${target_bod.toFixed(2)} mg/L</p>`;
                htmlOutput += `<p><strong>Required Retention Time (HRT):</strong> ${req_hrt.toFixed(2)} hours</p>`;
                htmlOutput += `<p style="font-size: 18px; color: #2980b9;"><strong>Required Tank Volume:</strong> <b>${req_volume.toFixed(2)} m³</b></p>`;
                htmlOutput += `<p><strong>Removal Efficiency:</strong> ${removal_eff.toFixed(1)}%</p>`;
                
                // Triggers the warning
                htmlOutput += checkTankLimits(req_volume);
            }

        } else if (mode === 'design-spec') {
            // --- 3. SPECIFICATION-DRIVEN DESIGN (Target HRT) ---
            let target_hrt = parseFloat(document.getElementById('target-hrt').value);
            let req_volume = target_hrt * flow_hourly;
            let effluent_bod = primary_bod / (1 + BIO_DECAY_RATE * target_hrt);
            let removal_eff = ((bod_in - effluent_bod) / bod_in) * 100;

            htmlOutput += `<p><strong>Target Retention Time (HRT):</strong> ${target_hrt.toFixed(2)} hours</p>`;
            htmlOutput += `<p style="font-size: 18px; color: #2980b9;"><strong>Required Tank Volume:</strong> <b>${req_volume.toFixed(2)} m³</b></p>`;
            htmlOutput += `<p><strong>Predicted Effluent BOD:</strong> ${effluent_bod.toFixed(2)} mg/L</p>`;
            htmlOutput += `<p><strong>Removal Efficiency:</strong> ${removal_eff.toFixed(1)}%</p>`;
            
            if (effluent_bod <= COMPLIANCE_LIMIT) {
                htmlOutput += `<p><strong>Status:</strong> <span class='safe'>SAFE TO DISCHARGE</span></p>`;
            } else {
                htmlOutput += `<p><strong>Status:</strong> <span class='violation'>❌ VIOLATION (Above 30 mg/L)</span></p>`;
            }

            // Triggers the warning
            htmlOutput += checkTankLimits(req_volume);
        }

        // Inject and display
        document.getElementById('result-content').innerHTML = htmlOutput;
        document.getElementById('resultBox').classList.remove('hidden');
    }
