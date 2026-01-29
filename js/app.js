const app = {
    init: function () {
        console.log('MR Portal Initialized');
        // Check if logged in (in a real app, check token)
        // For demo, show login screen first
    },

    login: function () {
        // Simulate Login
        const btn = document.querySelector('.login-form button');
        const originalText = btn.innerText;
        btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Signing In...';

        setTimeout(() => {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app-layout').style.display = 'block';
            this.navigate('dashboard');
            btn.innerText = originalText;
        }, 800);
    },

    logout: function () {
        // Return to Login
        document.getElementById('app-layout').style.display = 'none';
        document.getElementById('login-screen').style.display = 'flex';
        // Reset view state if needed
        this.state.inWizard = false;
    },

    navigate: function (viewId) {
        // Update Nav State
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        const activeLink = document.querySelector(`a[onclick*="${viewId}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Render View
        const content = document.getElementById('app-content');
        const title = document.getElementById('page-title');

        if (viewId === 'dashboard') {
            title.textContent = 'Dashboard';
            content.innerHTML = this.views.dashboard();
        } else if (viewId === 'applications') {
            title.textContent = 'Bulk Upload';
            content.innerHTML = this.views.applications();
        }
    },

    views: {
        dashboard: function () {
            return `
                <!-- Top Row: KPIs -->
                <div class="kpi-grid">
                    <div class="card kpi-card">
                        <span class="kpi-label">Submitted</span>
                        <span class="kpi-value">45</span>
                        <span class="kpi-trend trend-up"><i class="ph ph-check-circle"></i> This Month</span>
                    </div>
                    <div class="card kpi-card">
                        <span class="kpi-label">Approved</span>
                        <span class="kpi-value text-success">32</span>
                        <span class="kpi-trend trend-up"><i class="ph ph-trend-up"></i> 71% Rate</span>
                    </div>
                    <div class="card kpi-card">
                        <span class="kpi-label">Pending</span>
                        <span class="kpi-value" style="color: var(--warning-color)">8</span>
                        <span class="kpi-trend"><i class="ph ph-clock"></i> In Progress</span>
                    </div>
                    <div class="card kpi-card">
                        <span class="kpi-label">Rejected</span>
                        <span class="kpi-value" style="color: var(--danger-color)">5</span>
                        <span class="kpi-trend trend-down"><i class="ph ph-x-circle"></i> 11% Rate</span>
                    </div>
                </div>

                <!-- Middle Details Section -->
                <div class="dashboard-split-grid">
                    <!-- Left: Chart/Performance -->
                    <div class="card" style="min-height: 400px; display: flex; flex-direction: column;">
                        <div class="flex justify-between items-center" style="margin-bottom: 24px;">
                            <h3>Performance Overview</h3>
                            <select style="font-size: 0.85rem; padding: 4px 8px;"><option>This Year</option><option>Last Year</option></select>
                        </div>
                        
                        <!-- CSS/SVG Chart Simulation -->
                        <div style="flex: 1; display: flex; align-items: flex-end; justify-content: space-around; padding: 0 16px; gap: 8px;">
                            ${[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => `
                                <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                                    <div style="width: 100%; height: ${h * 2.5}px; background: ${i === 11 ? 'var(--accent-color)' : '#e2e8f0'}; border-radius: 4px 4px 0 0; transition: all 0.3s; opacity: 0.8;"></div>
                                    <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 8px;">${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Right: Quick Actions / Recent Apps -->
                    <div class="card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="padding: 16px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                            <h3 style="margin: 0; font-size: 1rem;">Recent Activity</h3>
                            <a href="#" style="font-size: 0.8rem; color: var(--accent-color);">View All</a>
                        </div>
                        <div class="table-container" style="flex: 1;">
                            <table>
                                <thead>
                                    <tr>
                                        <th>App ID</th>
                                        <th>Product</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#LN-889</td>
                                        <td>Personal-i</td>
                                        <td><span class="badge badge-success">Approved</span></td>
                                        <td><button class="icon-btn"><i class="ph ph-caret-right"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td>#LN-892</td>
                                        <td>Home Reno</td>
                                        <td><span class="badge badge-warning">Docs</span></td>
                                        <td><button class="icon-btn"><i class="ph ph-upload"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td>#LN-901</td>
                                        <td>Biz Micro</td>
                                        <td><span class="badge badge-blue">Review</span></td>
                                        <td><button class="icon-btn"><i class="ph ph-eye"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td>#LN-905</td>
                                        <td>Car Loan</td>
                                        <td><span class="badge badge-blue">Submit</span></td>
                                        <td><button class="icon-btn"><i class="ph ph-eye"></i></button></td>
                                    </tr>
                                     <tr>
                                        <td>#LN-910</td>
                                        <td>Personal</td>
                                        <td><span class="badge badge-blue">Draft</span></td>
                                        <td><button class="icon-btn"><i class="ph ph-pencil"></i></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        },

        applications: function () {
            // Check if we are in "Wizard Mode" state
            if (app.state.inWizard) {
                return app.renderWizard();
            }

            // Default State: Introduction / Start Upload
            return `
                <div class="flex justify-between items-center" style="margin-bottom: 24px;">
                    <h2>Bulk Application Upload</h2>
                </div>
                
                <!-- Action Section (Compact) -->
                <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 24px; margin-bottom: 24px;">
                    <div style="display: flex; align-items: center; gap: 24px;">
                        <div style="background: #eff6ff; padding: 12px; border-radius: 8px;">
                            <i class="ph ph-file-csv" style="font-size: 32px; color: var(--primary-color);"></i>
                        </div>
                        <div>
                            <h3 style="margin: 0 0 4px 0; font-size: 1.1rem;">Upload Multiple Applications</h3>
                            <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">Process CSV or Excel files in bulk.</p>
                        </div>
                    </div>
                     <button class="btn btn-primary" onclick="app.startWizard()">
                        <i class="ph ph-upload-simple"></i> Start Bulk Upload
                     </button>
                </div>

                <!-- History Section (Green Box Area) -->
                 <div class="card" style="padding: 0; min-height: 400px; display: flex; flex-direction: column;">
                     <div style="padding: 16px 24px; border-bottom: 1px solid #f1f5f9;">
                        <h3 style="margin: 0; font-size: 1rem;">Upload Summary</h3>
                     </div>
                     <div class="table-container" style="flex: 1;">
                        <table>
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>No. of Applications</th>
                                    <th>Status</th>
                                    <th>Uploaded Date/Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="font-weight: 500;"><i class="ph ph-file-csv" style="margin-right:8px; color: #64748b;"></i> batch_upload_v2.csv</td>
                                    <td>15</td>
                                    <td><span class="badge badge-success">Processed</span></td>
                                    <td>Oct 28, 2023, 10:30 AM</td>
                                    <td><button class="icon-btn"><i class="ph ph-eye"></i></button></td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 500;"><i class="ph ph-file-xls" style="margin-right:8px; color: #10b981;"></i> auto_loans_oct.xlsx</td>
                                    <td>8</td>
                                    <td><span class="badge badge-warning">Processing</span></td>
                                    <td>Oct 28, 2023, 09:15 AM</td>
                                    <td><button class="icon-btn"><i class="ph ph-spinner"></i></button></td>
                                </tr>
                                 <tr>
                                    <td style="font-weight: 500;"><i class="ph ph-file-csv" style="margin-right:8px; color: #64748b;"></i> legacy_data_import.csv</td>
                                    <td>45</td>
                                    <td><span class="badge badge-error" style="background: #fee2e2; color: #ef4444;">Failed</span></td>
                                    <td>Oct 27, 2023, 04:45 PM</td>
                                    <td><button class="icon-btn"><i class="ph ph-warning-circle" style="color: #ef4444;"></i></button></td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 500;"><i class="ph ph-file-csv" style="margin-right:8px; color: #64748b;"></i> personal_loans_batch1.csv</td>
                                    <td>12</td>
                                    <td><span class="badge badge-success">Processed</span></td>
                                    <td>Oct 26, 2023, 02:20 PM</td>
                                    <td><button class="icon-btn"><i class="ph ph-eye"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }
    },

    // Wizard Logic (Bulk Upload)
    state: {
        inWizard: false,
        currentStep: 1,
        formData: {}
    },

    startWizard: function () {
        this.state.inWizard = true;
        this.state.currentStep = 1;
        this.navigate('applications');
    },

    nextStep: function () {
        if (this.state.currentStep === 1) {
            // Move to Review Step
            this.state.currentStep = 2;
            this.navigate('applications');
        } else {
            // Submit
            this.submitApplication();
        }
    },

    prevStep: function () {
        if (this.state.currentStep > 1) {
            this.state.currentStep--;
            this.navigate('applications');
        } else {
            this.state.inWizard = false;
            this.navigate('applications');
        }
    },

    submitApplication: function () {
        const btn = document.querySelector('.btn-primary');
        btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Processing...';
        setTimeout(() => {
            alert('Bulk Upload Complete! 5 applications submitted successfully.');
            this.state.inWizard = false;
            this.navigate('dashboard');
        }, 1500);
    },

    renderWizard: function () {
        const step = this.state.currentStep;

        // Stepper HTML
        const stepsHtml = [
            { n: 1, label: 'Upload File', icon: 'ph-upload-simple', subtitle: 'First Step' },
            { n: 2, label: 'Review & Submit', icon: 'ph-check-square', subtitle: 'Final Step' }
        ].map(s => {
            let className = 'chevron-step';
            if (s.n === step) className += ' active';
            if (s.n < step) className += ' completed';

            return `
                <div class="${className}" data-step="${s.n}" onclick="${s.n < step ? 'app.prevStep()' : ''}">
                    <div class="step-content">
                        <i class="ph ${s.icon} step-icon"></i>
                        <span class="step-header">Step 0${s.n}</span>
                        <span class="step-title">${s.label}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Step Content
        let formContent = '';
        if (step === 1) {
            formContent = `
                <div class="form-group full-width">
                    <div class="upload-zone" style="padding: 48px 0; border: 2px dashed #cbd5e1; border-radius: 8px; text-align: center;">
                        <i class="ph ph-upload-simple" style="font-size: 48px; color: #94a3b8; margin-bottom: 16px;"></i>
                        <h4 style="margin-bottom: 8px; font-size: 1.1rem;">Click to upload or drag and drop</h4>
                        <p style="font-size: 0.9rem; color: #64748b;">CSV, Excel (XLSX) files only (Max 10MB)</p>
                        <input type="file" id="bulk-file" style="display: none;" onchange="document.getElementById('file-name').innerText = this.files[0].name">
                        <button class="btn btn-outline" style="margin-top: 16px;" onclick="document.getElementById('bulk-file').click()">Select File</button>
                        <p id="file-name" style="margin-top: 16px; font-weight: 500; color: var(--primary-color);"></p>
                    </div>
                </div>
            `;
        } else if (step === 2) {
            formContent = `
                <div class="form-group full-width">
                    <h3>Review Upload Content</h3>
                    <p style="margin-bottom: 16px; color: var(--text-muted);">We found <strong>3</strong> valid applications in <em>batch_upload_v2.csv</em>.</p>
                    
                    <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 8px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ref ID</th>
                                    <th>Customer Name</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>REF-001</td>
                                    <td>Alice Wong</td>
                                    <td>Personal-i</td>
                                    <td>$5,000</td>
                                    <td><span class="badge badge-success">Valid</span></td>
                                </tr>
                                <tr>
                                    <td>REF-002</td>
                                    <td>Kumar R.</td>
                                    <td>Home Reno</td>
                                    <td>$25,000</td>
                                    <td><span class="badge badge-success">Valid</span></td>
                                </tr>
                                <tr>
                                    <td>REF-003</td>
                                    <td>Siti Aminah</td>
                                    <td>Car Loan</td>
                                    <td>$80,000</td>
                                    <td><span class="badge badge-success">Valid</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        return `
            <div class="container">
                <div class="stepper-container">
                    <div class="stepper chevron-style">
                        ${stepsHtml}
                    </div>
                </div>

                <div class="form-section">
                    ${formContent}
                    
                    <div class="form-actions">
                        <button class="btn btn-outline" onclick="app.prevStep()">
                            ${step === 1 ? 'Cancel' : 'Back'}
                        </button>
                        <button class="btn btn-primary" onclick="app.nextStep()">
                            ${step === 2 ? 'Confirm & Submit' : 'Next Step'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});


