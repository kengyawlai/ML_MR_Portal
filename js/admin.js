var admin = {
    state: {
        selectedAgent: null,
        currentReportPeriod: 'year',
        agents: [
            {
                id: 'david.agent',
                name: 'David Agent',
                role: 'Senior MR',
                avatar: 'DA',
                color: '#3b82f6'
            },
            {
                id: 'sarah.lim',
                name: 'Sarah Lim',
                role: 'MR',
                avatar: 'SL',
                color: '#10b981'
            },
            {
                id: 'kumar.raj',
                name: 'Kumar Raj',
                role: 'Senior MR',
                avatar: 'KR',
                color: '#f59e0b'
            },
            {
                id: 'michelle.tan',
                name: 'Michelle Tan',
                role: 'MR',
                avatar: 'MT',
                color: '#8b5cf6'
            },
            {
                id: 'ahmad.zaki',
                name: 'Ahmad Zaki',
                role: 'Junior MR',
                avatar: 'AZ',
                color: '#ec4899'
            }
        ]
    },

    navigate: function(page) {
        const content = document.getElementById('admin-app-content');
        const pageTitle = document.getElementById('admin-page-title');
        
        if (!content) return;
        
        // Update active nav link
        document.querySelectorAll('#admin-app-layout .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate the clicked nav link
        const navLinks = document.querySelectorAll('#admin-app-layout .nav-link');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage === page) {
                link.classList.add('active');
            }
        });
        
        if (page === 'dashboard') {
            pageTitle.textContent = 'Dashboard';
            this.renderDashboard();
        } else if (page === 'reports') {
            pageTitle.textContent = 'Reports';
            this.renderReports();
        } else if (page === 'user-management') {
            pageTitle.textContent = 'User Management';
            this.renderUserManagement();
        }
    },

    renderUserManagement: function() {
        const content = document.getElementById('admin-app-content');
        if (!content) return;
        
        const agentStats = this.getAgentStats();
        
        content.innerHTML = `
            <div class="page-wrapper">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <h2>User Management</h2>
                    <button class="btn btn-primary" onclick="alert('Add new agent feature coming soon!')">
                        <i class="ph ph-plus"></i> Add Agent
                    </button>
                </div>

                <!-- Agent Cards Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px;">
                    ${agentStats.map(agent => {
                        const approvalRate = ((agent.approved / agent.total) * 100).toFixed(1);
                        const completionRate = (((agent.approved + agent.rejected) / agent.total) * 100).toFixed(1);
                        
                        return `
                            <div class="card" style="padding: 0; overflow: hidden; transition: all 0.3s; cursor: pointer;" onclick="admin.showAgentProfile('${agent.id}')" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';">
                                <!-- Header with gradient -->
                                <div style="background: linear-gradient(135deg, ${agent.color} 0%, ${agent.color}dd 100%); padding: 24px; position: relative; overflow: hidden;">
                                    <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                                    <div style="position: relative; z-index: 1; display: flex; align-items: center; gap: 16px;">
                                        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.2); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; backdrop-filter: blur(10px);">${agent.avatar}</div>
                                        <div style="flex: 1;">
                                            <div style="color: white; font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">${agent.name}</div>
                                            <div style="color: rgba(255,255,255,0.9); font-size: 0.85rem;">${agent.role}</div>
                                        </div>
                                        <div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                                            <span style="color: white; font-size: 0.75rem; font-weight: 600;">ACTIVE</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Stats -->
                                <div style="padding: 24px;">
                                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
                                        <div style="text-align: center;">
                                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">${agent.total}</div>
                                            <div style="font-size: 0.75rem; color: var(--text-muted);">Total Apps</div>
                                        </div>
                                        <div style="text-align: center;">
                                            <div style="font-size: 1.5rem; font-weight: 700; color: #10b981; margin-bottom: 4px;">${agent.approved}</div>
                                            <div style="font-size: 0.75rem; color: var(--text-muted);">Approved</div>
                                        </div>
                                        <div style="text-align: center;">
                                            <div style="font-size: 1.5rem; font-weight: 700; color: #ef4444; margin-bottom: 4px;">${agent.rejected}</div>
                                            <div style="font-size: 0.75rem; color: var(--text-muted);">Rejected</div>
                                        </div>
                                    </div>

                                    <!-- Performance Bars -->
                                    <div style="margin-bottom: 16px;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                            <span style="font-size: 0.8rem; color: var(--text-muted);">Approval Rate</span>
                                            <span style="font-size: 0.8rem; font-weight: 600; color: #10b981;">${approvalRate}%</span>
                                        </div>
                                        <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; width: ${approvalRate}%; background: #10b981; transition: width 0.3s;"></div>
                                        </div>
                                    </div>

                                    <div style="margin-bottom: 16px;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                            <span style="font-size: 0.8rem; color: var(--text-muted);">Completion Rate</span>
                                            <span style="font-size: 0.8rem; font-weight: 600; color: #3b82f6;">${completionRate}%</span>
                                        </div>
                                        <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; width: ${completionRate}%; background: #3b82f6; transition: width 0.3s;"></div>
                                        </div>
                                    </div>

                                    <!-- Action Button -->
                                    <button class="btn btn-outline btn-full" onclick="event.stopPropagation(); admin.showAgentProfile('${agent.id}')" style="margin-top: 8px;">
                                        <i class="ph ph-eye"></i> View Details
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    showAgentProfile: function(agentId) {
        const agentStats = this.getAgentStats();
        const agent = agentStats.find(a => a.id === agentId);
        
        if (!agent) return;
        
        // Get commission data - for David, use real data from app.js
        let commissionData = [];
        let totalCommission = 0;
        
        if (agentId === 'david.agent' && window.app && window.app.state) {
            // Use real data from David's account
            const davidApps = window.app.state.applications.filter(a => a.loan.status === 'Approved');
            commissionData = davidApps.map(application => {
                const product = application.loan.product;
                const amountStr = application.loan.amountApproved || application.loan.amountRequested;
                const amount = parseFloat(amountStr.replace(/[RM,\s]/g, ''));
                const commissionRates = {
                    'Personal-i': 1.5,
                    'Home Reno': 2.0,
                    'Biz Micro': 2.5,
                    'Car Loan': 1.8,
                    'Personal': 1.5,
                    'Housing Loan': 2.2
                };
                const rate = commissionRates[product] || 1.5;
                const commission = (amount * rate) / 100;
                totalCommission += commission;
                
                return {
                    appId: application.id,
                    customerName: application.customer.fullName,
                    product: application.loan.product,
                    amount: amountStr,
                    rate: rate,
                    commission: commission,
                    date: application.loan.submissionDate
                };
            });
        } else {
            // Generate sample commission data for other agents
            for (let i = 0; i < agent.approved; i++) {
                const products = ['Personal-i', 'Home Reno', 'Biz Micro', 'Car Loan', 'Personal', 'Housing Loan'];
                const product = products[Math.floor(Math.random() * products.length)];
                const amount = Math.floor(Math.random() * 100000) + 10000;
                const commissionRates = {
                    'Personal-i': 1.5,
                    'Home Reno': 2.0,
                    'Biz Micro': 2.5,
                    'Car Loan': 1.8,
                    'Personal': 1.5,
                    'Housing Loan': 2.2
                };
                const rate = commissionRates[product];
                const commission = (amount * rate) / 100;
                totalCommission += commission;
                
                commissionData.push({
                    appId: `#APP-2023-${900 + i}`,
                    customerName: `Customer ${i + 1}`,
                    product: product,
                    amount: `RM ${amount.toLocaleString('en-MY')}`,
                    rate: rate,
                    commission: commission,
                    date: 'Oct 28, 2023 10:30 AM'
                });
            }
        }
        
        const modal = document.getElementById('agent-details-modal');
        if (!modal) {
            // Create modal container if it doesn't exist
            const modalDiv = document.createElement('div');
            modalDiv.id = 'agent-details-modal';
            document.body.appendChild(modalDiv);
        }
        
        const modalElement = document.getElementById('agent-details-modal');
        modalElement.style.display = 'block';
        modalElement.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; overflow-y: auto;" onclick="admin.closeAgentProfile(event)">
                <div class="card" style="max-width: 1200px; width: 100%; max-height: 90vh; overflow-y: auto; margin: auto;" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, ${agent.color} 0%, ${agent.color}dd 100%); padding: 32px; position: relative; overflow: hidden; margin: -24px -24px 24px -24px;">
                        <div style="position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                        <div style="position: absolute; bottom: -60px; left: -60px; width: 240px; height: 240px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                        <div style="position: relative; z-index: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 24px;">
                                <div style="display: flex; align-items: center; gap: 20px;">
                                    <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.2); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 2rem; backdrop-filter: blur(10px);">${agent.avatar}</div>
                                    <div>
                                        <h2 style="margin: 0; color: white; font-size: 1.8rem;">${agent.name}</h2>
                                        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 1rem;">${agent.role}</p>
                                        <div style="display: flex; gap: 12px; margin-top: 12px;">
                                            <div style="background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 20px; backdrop-filter: blur(10px);">
                                                <span style="color: white; font-size: 0.8rem; font-weight: 600;">ID: ${agent.id}</span>
                                            </div>
                                            <div style="background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 20px; backdrop-filter: blur(10px);">
                                                <span style="color: white; font-size: 0.8rem; font-weight: 600;">ACTIVE</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button onclick="admin.closeAgentProfile()" class="icon-btn" style="background: rgba(255,255,255,0.2); color: white; font-size: 1.5rem; backdrop-filter: blur(10px);">
                                    <i class="ph ph-x"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Stats Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 32px;">
                        <div style="padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid ${agent.color};">
                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">Total Applications</div>
                            <div style="font-size: 2rem; font-weight: 700; color: var(--text-main);">${agent.total}</div>
                        </div>
                        <div style="padding: 20px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">Approved</div>
                            <div style="font-size: 2rem; font-weight: 700; color: #10b981;">${agent.approved}</div>
                        </div>
                        <div style="padding: 20px; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">Rejected</div>
                            <div style="font-size: 2rem; font-weight: 700; color: #ef4444;">${agent.rejected}</div>
                        </div>
                        <div style="padding: 20px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b;">
                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">Pending</div>
                            <div style="font-size: 2rem; font-weight: 700; color: #f59e0b;">${agent.underReview + agent.submitted + agent.additionalInfo}</div>
                        </div>
                        <div style="padding: 20px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">Total Commission</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: #3b82f6;">RM ${totalCommission.toLocaleString('en-MY', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                        </div>
                    </div>

                    <!-- Performance Metrics -->
                    <div style="margin-bottom: 32px;">
                        <h3 style="margin-bottom: 20px;">Performance Metrics</h3>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="font-weight: 500;">Approval Rate</span>
                                    <span style="color: #10b981; font-weight: 600;">${((agent.approved / agent.total) * 100).toFixed(1)}%</span>
                                </div>
                                <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">
                                    <div style="height: 100%; width: ${(agent.approved / agent.total) * 100}%; background: #10b981;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="font-weight: 500;">Rejection Rate</span>
                                    <span style="color: #ef4444; font-weight: 600;">${((agent.rejected / agent.total) * 100).toFixed(1)}%</span>
                                </div>
                                <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">
                                    <div style="height: 100%; width: ${(agent.rejected / agent.total) * 100}%; background: #ef4444;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="font-weight: 500;">Completion Rate</span>
                                    <span style="color: #3b82f6; font-weight: 600;">${(((agent.approved + agent.rejected) / agent.total) * 100).toFixed(1)}%</span>
                                </div>
                                <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">
                                    <div style="height: 100%; width: ${((agent.approved + agent.rejected) / agent.total) * 100}%; background: #3b82f6;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Commission Breakdown -->
                    <div style="margin-bottom: 32px;">
                        <h3 style="margin-bottom: 20px;">Commission Summary by Product</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                            ${(() => {
                                // Group commissions by product
                                const productBreakdown = {};
                                commissionData.forEach(item => {
                                    if (!productBreakdown[item.product]) {
                                        productBreakdown[item.product] = {
                                            count: 0,
                                            total: 0,
                                            rate: item.rate
                                        };
                                    }
                                    productBreakdown[item.product].count++;
                                    productBreakdown[item.product].total += item.commission;
                                });
                                
                                const productColors = {
                                    'Personal-i': '#8b5cf6',
                                    'Home Reno': '#f59e0b',
                                    'Biz Micro': '#10b981',
                                    'Car Loan': '#3b82f6',
                                    'Personal': '#ec4899',
                                    'Housing Loan': '#06b6d4'
                                };
                                
                                return Object.entries(productBreakdown).map(([product, data]) => `
                                    <div style="padding: 20px; background: ${productColors[product] || '#6366f1'}15; border-radius: 8px; border-left: 4px solid ${productColors[product] || '#6366f1'};">
                                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px; font-weight: 500;">${product}</div>
                                        <div style="font-size: 1.5rem; font-weight: 700; color: ${productColors[product] || '#6366f1'}; margin-bottom: 8px;">RM ${data.total.toLocaleString('en-MY', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
                                            <span>${data.count} application${data.count > 1 ? 's' : ''}</span>
                                            <span>${data.rate}% rate</span>
                                        </div>
                                    </div>
                                `).join('');
                            })()}
                        </div>
                    </div>

                    <!-- Detailed Commission Table -->
                    <div>
                        <h3 style="margin-bottom: 20px;">Detailed Commission Breakdown (${commissionData.length} Approved Applications)</h3>
                        <div class="table-container" style="max-height: 400px; overflow-y: auto;">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Application ID</th>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Loan Amount</th>
                                        <th>Rate</th>
                                        <th>Commission</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${commissionData.map(item => `
                                        <tr>
                                            <td style="font-weight: 600;">${item.appId}</td>
                                            <td>${item.customerName}</td>
                                            <td>${item.product}</td>
                                            <td>${item.amount}</td>
                                            <td>${item.rate}%</td>
                                            <td style="font-weight: 600; color: #10b981;">RM ${item.commission.toLocaleString('en-MY', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                            <td>${item.date}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                                <tfoot>
                                    <tr style="background: #f8fafc; font-weight: 700;">
                                        <td colspan="5" style="text-align: right;">Total Commission:</td>
                                        <td style="color: #10b981; font-size: 1.1rem;">RM ${totalCommission.toLocaleString('en-MY', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 12px; padding-top: 24px; border-top: 1px solid #f1f5f9; margin-top: 24px;">
                        <button onclick="admin.closeAgentProfile()" class="btn btn-outline">Close</button>
                    </div>
                </div>
            </div>
        `;
    },

    closeAgentProfile: function(event) {
        if (event) {
            event.stopPropagation();
        }
        const modal = document.getElementById('agent-details-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.innerHTML = '';
        }
    },

    getAgentStats: function() {
        // Get all applications from app.js
        const allApplications = window.app && window.app.state ? window.app.state.applications : [];
        
        // For David, use actual data from app.state.applications but hardcode total to 33
        // For others, use static sample data
        const stats = this.state.agents.map(agent => {
            if (agent.id === 'david.agent') {
                // Use real data for David but adjust to show 33 total
                const davidApps = allApplications;
                const actualTotal = davidApps.length;
                const displayTotal = 33; // Hardcoded to 33
                
                // Calculate actual counts
                const actualApproved = davidApps.filter(a => a.loan.status === 'Approved').length;
                const actualRejected = davidApps.filter(a => a.loan.status === 'Rejected').length;
                const actualUnderReview = davidApps.filter(a => a.loan.status === 'Under Review').length;
                const actualSubmitted = davidApps.filter(a => a.loan.status === 'Submitted').length;
                const actualAdditionalInfo = davidApps.filter(a => a.loan.status === 'Additional Info Required').length;
                const actualDraft = davidApps.filter(a => a.loan.status === 'Draft').length;
                
                // Adjust counts proportionally to match total of 33
                const ratio = displayTotal / actualTotal;
                
                return {
                    ...agent,
                    total: displayTotal,
                    approved: Math.round(actualApproved * ratio),
                    rejected: Math.round(actualRejected * ratio),
                    underReview: Math.round(actualUnderReview * ratio),
                    submitted: Math.round(actualSubmitted * ratio),
                    additionalInfo: Math.round(actualAdditionalInfo * ratio),
                    draft: Math.round(actualDraft * ratio)
                };
            } else if (agent.id === 'sarah.lim') {
                return {
                    ...agent,
                    total: 28,
                    approved: 12,
                    rejected: 4,
                    underReview: 6,
                    submitted: 4,
                    additionalInfo: 2,
                    draft: 0
                };
            } else if (agent.id === 'kumar.raj') {
                return {
                    ...agent,
                    total: 31,
                    approved: 14,
                    rejected: 5,
                    underReview: 7,
                    submitted: 3,
                    additionalInfo: 2,
                    draft: 0
                };
            } else if (agent.id === 'michelle.tan') {
                return {
                    ...agent,
                    total: 24,
                    approved: 10,
                    rejected: 3,
                    underReview: 5,
                    submitted: 4,
                    additionalInfo: 2,
                    draft: 0
                };
            } else if (agent.id === 'ahmad.zaki') {
                return {
                    ...agent,
                    total: 19,
                    approved: 8,
                    rejected: 3,
                    underReview: 4,
                    submitted: 3,
                    additionalInfo: 1,
                    draft: 0
                };
            }
        });
        
        return stats;
    },

    renderDashboard: function () {
        const content = document.getElementById('admin-app-content');
        if (!content) return;
        
        const agentStats = this.getAgentStats();
        const totalApplications = agentStats.reduce((sum, agent) => sum + agent.total, 0);
        const totalApproved = agentStats.reduce((sum, agent) => sum + agent.approved, 0);
        const totalRejected = agentStats.reduce((sum, agent) => sum + agent.rejected, 0);
        const totalPending = agentStats.reduce((sum, agent) => sum + agent.underReview + agent.submitted + agent.additionalInfo, 0);

        content.innerHTML = `
            <div class="page-wrapper">
                <h2>Supervisor Dashboard</h2>
                
                <!-- Summary Cards -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 32px;">
                    <div class="card" style="padding: 0; overflow: hidden; border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';">
                        <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 24px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                            <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                            <div style="position: relative; z-index: 1;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                        <i class="ph ph-users" style="color: white; font-size: 24px;"></i>
                                    </div>
                                    <div style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                                        <span style="color: white; font-size: 0.75rem; font-weight: 600;">TEAM</span>
                                    </div>
                                </div>
                                <div style="color: rgba(255,255,255,0.9); font-size: 0.85rem; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.5px;">TOTAL AGENTS</div>
                                <div style="color: white; font-size: 2.5rem; font-weight: 700; line-height: 1; margin-bottom: 12px;">${agentStats.length}</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.95); font-size: 0.85rem; font-weight: 600;">
                                    <i class="ph ph-check-circle" style="font-size: 1rem;"></i>
                                    <span>Active members</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="padding: 0; overflow: hidden; border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';">
                        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 24px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                            <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                            <div style="position: relative; z-index: 1;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                        <i class="ph ph-files" style="color: white; font-size: 24px;"></i>
                                    </div>
                                    <div style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                                        <span style="color: white; font-size: 0.75rem; font-weight: 600;">OVERVIEW</span>
                                    </div>
                                </div>
                                <div style="color: rgba(255,255,255,0.9); font-size: 0.85rem; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.5px;">TOTAL APPLICATIONS</div>
                                <div style="color: white; font-size: 2.5rem; font-weight: 700; line-height: 1; margin-bottom: 12px;">${totalApplications}</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.95); font-size: 0.85rem; font-weight: 600;">
                                    <i class="ph ph-trend-up" style="font-size: 1rem;"></i>
                                    <span>All submissions</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="padding: 0; overflow: hidden; border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';">
                        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 24px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                            <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                            <div style="position: relative; z-index: 1;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                        <i class="ph ph-check-circle" style="color: white; font-size: 24px;"></i>
                                    </div>
                                    <div style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                                        <span style="color: white; font-size: 0.75rem; font-weight: 600;">SUCCESS</span>
                                    </div>
                                </div>
                                <div style="color: rgba(255,255,255,0.9); font-size: 0.85rem; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.5px;">APPROVED</div>
                                <div style="color: white; font-size: 2.5rem; font-weight: 700; line-height: 1; margin-bottom: 12px;">${totalApproved}</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.95); font-size: 0.85rem; font-weight: 600;">
                                    <i class="ph ph-chart-line-up" style="font-size: 1rem;"></i>
                                    <span>${((totalApproved / totalApplications) * 100).toFixed(1)}% success rate</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="padding: 0; overflow: hidden; border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';">
                        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 24px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                            <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                            <div style="position: relative; z-index: 1;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                        <i class="ph ph-clock" style="color: white; font-size: 24px;"></i>
                                    </div>
                                    <div style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                                        <span style="color: white; font-size: 0.75rem; font-weight: 600;">IN PROGRESS</span>
                                    </div>
                                </div>
                                <div style="color: rgba(255,255,255,0.9); font-size: 0.85rem; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.5px;">PENDING</div>
                                <div style="color: white; font-size: 2.5rem; font-weight: 700; line-height: 1; margin-bottom: 12px;">${totalPending}</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.95); font-size: 0.85rem; font-weight: 600;">
                                    <i class="ph ph-hourglass" style="font-size: 1rem;"></i>
                                    <span>Awaiting review</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Agent Performance Chart -->
                <div class="card" style="margin-bottom: 32px;">
                    <h3 style="margin-bottom: 24px;">Agent Performance Overview</h3>
                    <div style="display: flex; gap: 24px; align-items: flex-end; padding: 24px; min-height: 350px;">
                        ${agentStats.map(agent => {
                            const maxHeight = 250;
                            const maxTotal = Math.max(...agentStats.map(a => a.total));
                            const heightPercent = (agent.total / maxTotal) * 100;
                            const barHeight = (heightPercent / 100) * maxHeight;
                            
                            return `
                                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer;" onclick="admin.showAgentDetails('${agent.id}')">
                                    <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-main); margin-bottom: 8px;">${agent.total}</div>
                                    <div style="width: 100%; height: ${barHeight}px; background: linear-gradient(to top, ${agent.color}, ${agent.color}dd); border-radius: 8px 8px 0 0; transition: all 0.3s; position: relative; display: flex; flex-direction: column; justify-content: flex-end; padding: 8px;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                                        <div style="color: white; font-size: 0.75rem; font-weight: 600; text-align: center; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                                            ${agent.approved > 0 ? `✓ ${agent.approved}` : ''}
                                        </div>
                                    </div>
                                    <div style="margin-top: 12px; text-align: center;">
                                        <div style="width: 40px; height: 40px; border-radius: 50%; background: ${agent.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; margin: 0 auto 8px;">${agent.avatar}</div>
                                        <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-main);">${agent.name.split(' ')[0]}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">${agent.role}</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Agent Details Modal Placeholder -->
                <div id="agent-details-modal" style="display: none;"></div>
            </div>
        `;
    },

    showAgentDetails: function(agentId) {
        const agentStats = this.getAgentStats();
        const agent = agentStats.find(a => a.id === agentId);
        
        if (!agent) return;
        
        const modal = document.getElementById('agent-details-modal');
        if (!modal) return;
        
        modal.style.display = 'block';
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px;" onclick="admin.closeAgentDetails(event)">
                <div class="card" style="max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation()">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #f1f5f9;">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="width: 60px; height: 60px; border-radius: 50%; background: ${agent.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem;">${agent.avatar}</div>
                            <div>
                                <h2 style="margin: 0;">${agent.name}</h2>
                                <p style="color: var(--text-muted); margin: 4px 0 0 0;">${agent.role}</p>
                            </div>
                        </div>
                        <button onclick="admin.closeAgentDetails()" class="icon-btn" style="font-size: 1.5rem;">
                            <i class="ph ph-x"></i>
                        </button>
                    </div>

                    <!-- Status Breakdown -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 24px;">
                        <div style="padding: 16px; background: #d1fae5; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700; color: #065f46;">${agent.approved}</div>
                            <div style="font-size: 0.85rem; color: #047857; margin-top: 4px;">Approved</div>
                        </div>
                        <div style="padding: 16px; background: #fee2e2; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700; color: #991b1b;">${agent.rejected}</div>
                            <div style="font-size: 0.85rem; color: #dc2626; margin-top: 4px;">Rejected</div>
                        </div>
                        <div style="padding: 16px; background: #dbeafe; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700; color: #1e40af;">${agent.underReview}</div>
                            <div style="font-size: 0.85rem; color: #2563eb; margin-top: 4px;">Under Review</div>
                        </div>
                        <div style="padding: 16px; background: #e0f2fe; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700; color: #0284c7;">${agent.submitted}</div>
                            <div style="font-size: 0.85rem; color: #0ea5e9; margin-top: 4px;">Submitted</div>
                        </div>
                        <div style="padding: 16px; background: #fef3c7; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700; color: #92400e;">${agent.additionalInfo}</div>
                            <div style="font-size: 0.85rem; color: #b45309; margin-top: 4px;">Additional Info</div>
                        </div>
                        <div style="padding: 16px; background: #f1f5f9; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700; color: #64748b;">${agent.draft}</div>
                            <div style="font-size: 0.85rem; color: #475569; margin-top: 4px;">Draft</div>
                        </div>
                    </div>

                    <!-- Performance Metrics -->
                    <div style="margin-bottom: 24px;">
                        <h3 style="margin-bottom: 16px;">Performance Metrics</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                    <span style="font-weight: 500;">Approval Rate</span>
                                    <span style="color: #10b981; font-weight: 600;">${((agent.approved / agent.total) * 100).toFixed(1)}%</span>
                                </div>
                                <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; width: ${(agent.approved / agent.total) * 100}%; background: #10b981;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                    <span style="font-weight: 500;">Rejection Rate</span>
                                    <span style="color: #ef4444; font-weight: 600;">${((agent.rejected / agent.total) * 100).toFixed(1)}%</span>
                                </div>
                                <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; width: ${(agent.rejected / agent.total) * 100}%; background: #ef4444;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                    <span style="font-weight: 500;">Completion Rate</span>
                                    <span style="color: #3b82f6; font-weight: 600;">${(((agent.approved + agent.rejected) / agent.total) * 100).toFixed(1)}%</span>
                                </div>
                                <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; width: ${((agent.approved + agent.rejected) / agent.total) * 100}%; background: #3b82f6;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 12px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                        <button onclick="admin.closeAgentDetails()" class="btn btn-outline">Close</button>
                        ${agent.id === 'david.agent' ? '<button onclick="admin.viewAgentApplications(\'' + agent.id + '\')" class="btn btn-primary">View Applications</button>' : ''}
                    </div>
                </div>
            </div>
        `;
    },

    closeAgentDetails: function(event) {
        if (event) {
            event.stopPropagation();
        }
        const modal = document.getElementById('agent-details-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.innerHTML = '';
        }
    },

    viewAgentApplications: function(agentId) {
        // For David, we can show the actual applications
        if (agentId === 'david.agent') {
            alert('This would navigate to the application tracking page filtered for David\'s applications. Feature coming soon!');
        }
    },

    renderReports: function() {
        const content = document.getElementById('admin-app-content');
        if (!content) return;
        
        const agentStats = this.getAgentStats();
        
        content.innerHTML = `
            <div class="page-wrapper">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <h2>Reports & Analytics</h2>
                    <div style="display: flex; gap: 12px;">
                        <select id="report-period-selector" onchange="admin.updateReportPeriod(this.value)" style="padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.9rem;">
                            <option value="year" ${this.state.currentReportPeriod === 'year' ? 'selected' : ''}>This Year (2025)</option>
                            <option value="lastYear" ${this.state.currentReportPeriod === 'lastYear' ? 'selected' : ''}>Last Year (2024)</option>
                            <option value="month" ${this.state.currentReportPeriod === 'month' ? 'selected' : ''}>This Month (Dec 2025)</option>
                        </select>
                        <button onclick="admin.exportToCSV()" class="btn btn-primary">
                            <i class="ph ph-download-simple"></i> Export CSV
                        </button>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 32px;">
                    <div class="card" style="padding: 0; overflow: hidden; border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';">
                        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 24px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                            <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                            <div style="position: relative; z-index: 1;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                        <i class="ph ph-check-circle" style="color: white; font-size: 24px;"></i>
                                    </div>
                                    <div style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                                        <span style="color: white; font-size: 0.75rem; font-weight: 600;">SUCCESS</span>
                                    </div>
                                </div>
                                <div style="color: rgba(255,255,255,0.9); font-size: 0.85rem; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.5px;">TOTAL APPROVED</div>
                                <div style="color: white; font-size: 2.5rem; font-weight: 700; line-height: 1; margin-bottom: 12px;">${agentStats.reduce((sum, a) => sum + a.approved, 0)}</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.95); font-size: 0.85rem; font-weight: 600;">
                                    <i class="ph ph-trend-up" style="font-size: 1rem;"></i>
                                    <span>${((agentStats.reduce((sum, a) => sum + a.approved, 0) / agentStats.reduce((sum, a) => sum + a.total, 0)) * 100).toFixed(1)}% approval rate</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="padding: 0; overflow: hidden; border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';">
                        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 24px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                            <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                            <div style="position: relative; z-index: 1;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                        <i class="ph ph-x-circle" style="color: white; font-size: 24px;"></i>
                                    </div>
                                    <div style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                                        <span style="color: white; font-size: 0.75rem; font-weight: 600;">DECLINED</span>
                                    </div>
                                </div>
                                <div style="color: rgba(255,255,255,0.9); font-size: 0.85rem; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.5px;">TOTAL REJECTED</div>
                                <div style="color: white; font-size: 2.5rem; font-weight: 700; line-height: 1; margin-bottom: 12px;">${agentStats.reduce((sum, a) => sum + a.rejected, 0)}</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.95); font-size: 0.85rem; font-weight: 600;">
                                    <i class="ph ph-trend-down" style="font-size: 1rem;"></i>
                                    <span>${((agentStats.reduce((sum, a) => sum + a.rejected, 0) / agentStats.reduce((sum, a) => sum + a.total, 0)) * 100).toFixed(1)}% rejection rate</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="padding: 0; overflow: hidden; border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';">
                        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 24px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                            <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                            <div style="position: relative; z-index: 1;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                        <i class="ph ph-clock" style="color: white; font-size: 24px;"></i>
                                    </div>
                                    <div style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                                        <span style="color: white; font-size: 0.75rem; font-weight: 600;">IN PROGRESS</span>
                                    </div>
                                </div>
                                <div style="color: rgba(255,255,255,0.9); font-size: 0.85rem; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.5px;">PENDING REVIEW</div>
                                <div style="color: white; font-size: 2.5rem; font-weight: 700; line-height: 1; margin-bottom: 12px;">${agentStats.reduce((sum, a) => sum + a.underReview + a.submitted + a.additionalInfo, 0)}</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.95); font-size: 0.85rem; font-weight: 600;">
                                    <i class="ph ph-hourglass" style="font-size: 1rem;"></i>
                                    <span>Awaiting decision</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="padding: 0; overflow: hidden; border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';">
                        <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 24px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                            <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                            <div style="position: relative; z-index: 1;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                        <i class="ph ph-files" style="color: white; font-size: 24px;"></i>
                                    </div>
                                    <div style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                                        <span style="color: white; font-size: 0.75rem; font-weight: 600;">OVERVIEW</span>
                                    </div>
                                </div>
                                <div style="color: rgba(255,255,255,0.9); font-size: 0.85rem; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.5px;">TOTAL APPLICATIONS</div>
                                <div style="color: white; font-size: 2.5rem; font-weight: 700; line-height: 1; margin-bottom: 12px;">${agentStats.reduce((sum, a) => sum + a.total, 0)}</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.95); font-size: 0.85rem; font-weight: 600;">
                                    <i class="ph ph-users-three" style="font-size: 1rem;"></i>
                                    <span>Across ${agentStats.length} agents</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Monthly Performance Chart -->
                <div class="card" style="margin-bottom: 32px;">
                    <h3 style="margin-bottom: 24px;">Monthly Performance Trend</h3>
                    <div id="monthly-chart" style="padding: 24px;">
                        ${this.renderMonthlyChart()}
                    </div>
                </div>

                <!-- Agent Comparison Chart -->
                <div class="card" style="margin-bottom: 32px;">
                    <h3 style="margin-bottom: 24px;">Agent Performance Comparison</h3>
                    <div style="padding: 24px;">
                        ${this.renderAgentComparisonChart(agentStats)}
                    </div>
                </div>

                <!-- Status Distribution -->
                <div class="card" style="margin-bottom: 32px;">
                    <h3 style="margin-bottom: 24px;">Application Status Distribution</h3>
                    <div style="padding: 24px;">
                        ${this.renderStatusDistribution(agentStats)}
                    </div>
                </div>

                <!-- Detailed Agent Table -->
                <div class="card">
                    <h3 style="margin-bottom: 24px;">Detailed Agent Statistics</h3>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Agent</th>
                                    <th>Total</th>
                                    <th>Approved</th>
                                    <th>Rejected</th>
                                    <th>Under Review</th>
                                    <th>Submitted</th>
                                    <th>Additional Info</th>
                                    <th>Draft</th>
                                    <th>Approval Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${agentStats.map(agent => `
                                    <tr>
                                        <td>
                                            <div style="display: flex; align-items: center; gap: 12px;">
                                                <div style="width: 32px; height: 32px; border-radius: 50%; background: ${agent.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.8rem;">${agent.avatar}</div>
                                                <div>
                                                    <div style="font-weight: 600;">${agent.name}</div>
                                                    <div style="font-size: 0.75rem; color: var(--text-muted);">${agent.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style="font-weight: 600;">${agent.total}</td>
                                        <td><span style="color: #10b981; font-weight: 600;">${agent.approved}</span></td>
                                        <td><span style="color: #ef4444; font-weight: 600;">${agent.rejected}</span></td>
                                        <td>${agent.underReview}</td>
                                        <td>${agent.submitted}</td>
                                        <td>${agent.additionalInfo}</td>
                                        <td>${agent.draft}</td>
                                        <td>
                                            <div style="display: flex; align-items: center; gap: 8px;">
                                                <div style="flex: 1; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                                                    <div style="height: 100%; width: ${(agent.approved / agent.total * 100)}%; background: #10b981;"></div>
                                                </div>
                                                <span style="font-weight: 600; font-size: 0.85rem;">${((agent.approved / agent.total) * 100).toFixed(1)}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    renderMonthlyChart: function() {
        const period = this.state.currentReportPeriod;
        let data = [];
        
        if (period === 'year') {
            // This Year (2026) - adjusted for more realistic numbers
            data = [
                { month: 'Jan', approved: 82, rejected: 28, pending: 0 },
                { month: 'Feb', approved: 88, rejected: 25, pending: 0 },
                { month: 'Mar', approved: 78, rejected: 32, pending: 0 },
                { month: 'Apr', approved: 91, rejected: 24, pending: 0 },
                { month: 'May', approved: 85, rejected: 29, pending: 0 },
                { month: 'Jun', approved: 94, rejected: 26, pending: 0 },
                { month: 'Jul', approved: 89, rejected: 31, pending: 0 },
                { month: 'Aug', approved: 81, rejected: 27, pending: 0 },
                { month: 'Sep', approved: 96, rejected: 23, pending: 0 },
                { month: 'Oct', approved: 87, rejected: 30, pending: 0 },
                { month: 'Nov', approved: 64, rejected: 22, pending: 44 },
                { month: 'Dec', approved: 55, rejected: 18, pending: 58 }
            ];
        } else if (period === 'lastYear') {
            // Last Year (2025) - no pending applications
            data = [
                { month: 'Jan', approved: 75, rejected: 25, pending: 0 },
                { month: 'Feb', approved: 82, rejected: 28, pending: 0 },
                { month: 'Mar', approved: 71, rejected: 29, pending: 0 },
                { month: 'Apr', approved: 86, rejected: 24, pending: 0 },
                { month: 'May', approved: 79, rejected: 31, pending: 0 },
                { month: 'Jun', approved: 88, rejected: 22, pending: 0 },
                { month: 'Jul', approved: 84, rejected: 26, pending: 0 },
                { month: 'Aug', approved: 77, rejected: 33, pending: 0 },
                { month: 'Sep', approved: 91, rejected: 19, pending: 0 },
                { month: 'Oct', approved: 83, rejected: 27, pending: 0 },
                { month: 'Nov', approved: 89, rejected: 21, pending: 0 },
                { month: 'Dec', approved: 92, rejected: 28, pending: 0 }
            ];
        } else if (period === 'month') {
            // This Month (December 2026) - weekly breakdown with more variation
            data = [
                { month: 'Week 1', approved: 18, rejected: 6, pending: 10 },
                { month: 'Week 2', approved: 12, rejected: 3, pending: 18 },
                { month: 'Week 3', approved: 10, rejected: 4, pending: 12 },
                { month: 'Week 4', approved: 15, rejected: 5, pending: 18 }
            ];
        }

        const maxValue = Math.max(...data.map(d => d.approved + d.rejected + d.pending));

        return `
            <div style="display: flex; gap: 16px; align-items: flex-end; min-height: 300px;">
                ${data.map(d => {
                    const total = d.approved + d.rejected + d.pending;
                    const approvedHeight = (d.approved / maxValue) * 250;
                    const rejectedHeight = (d.rejected / maxValue) * 250;
                    const pendingHeight = (d.pending / maxValue) * 250;
                    
                    return `
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                            <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 8px;">${total}</div>
                            <div style="width: 100%; display: flex; flex-direction: column-reverse; position: relative;">
                                <div style="width: 100%; height: ${approvedHeight}px; background: #10b981; border-radius: ${d.rejected === 0 && d.pending === 0 ? '4px 4px 0 0' : '0'}; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem; font-weight: 600;" title="Approved: ${d.approved}">${approvedHeight > 20 ? d.approved : ''}</div>
                                ${d.rejected > 0 ? `<div style="width: 100%; height: ${rejectedHeight}px; background: #ef4444; ${d.pending === 0 ? 'border-radius: 4px 4px 0 0;' : ''} display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem; font-weight: 600;" title="Rejected: ${d.rejected}">${rejectedHeight > 20 ? d.rejected : ''}</div>` : ''}
                                ${d.pending > 0 ? `<div style="width: 100%; height: ${pendingHeight}px; background: #f59e0b; border-radius: 4px 4px 0 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem; font-weight: 600;" title="Pending: ${d.pending}">${pendingHeight > 20 ? d.pending : ''}</div>` : ''}
                            </div>
                            <div style="margin-top: 12px; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">${d.month}</div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="display: flex; gap: 24px; justify-content: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 16px; height: 16px; background: #10b981; border-radius: 3px;"></div>
                    <span style="font-size: 0.85rem;">Approved</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 16px; height: 16px; background: #ef4444; border-radius: 3px;"></div>
                    <span style="font-size: 0.85rem;">Rejected</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 16px; height: 16px; background: #f59e0b; border-radius: 3px;"></div>
                    <span style="font-size: 0.85rem;">Pending</span>
                </div>
            </div>
        `;
    },

    renderAgentComparisonChart: function(agentStats) {
        const maxTotal = Math.max(...agentStats.map(a => a.total));
        
        return `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                ${agentStats.map(agent => {
                    const approvedWidth = (agent.approved / maxTotal) * 100;
                    const rejectedWidth = (agent.rejected / maxTotal) * 100;
                    const pendingWidth = ((agent.underReview + agent.submitted + agent.additionalInfo) / maxTotal) * 100;
                    
                    return `
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${agent.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.8rem;">${agent.avatar}</div>
                                    <span style="font-weight: 600;">${agent.name}</span>
                                </div>
                                <span style="font-weight: 700; color: var(--text-main);">${agent.total} total</span>
                            </div>
                            <div style="display: flex; height: 32px; border-radius: 6px; overflow: hidden; background: #f1f5f9;">
                                ${agent.approved > 0 ? `<div style="width: ${approvedWidth}%; background: #10b981; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: 600;" title="Approved: ${agent.approved}">${approvedWidth > 8 ? agent.approved : ''}</div>` : ''}
                                ${agent.rejected > 0 ? `<div style="width: ${rejectedWidth}%; background: #ef4444; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: 600;" title="Rejected: ${agent.rejected}">${rejectedWidth > 8 ? agent.rejected : ''}</div>` : ''}
                                ${(agent.underReview + agent.submitted + agent.additionalInfo) > 0 ? `<div style="width: ${pendingWidth}%; background: #f59e0b; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: 600;" title="Pending: ${agent.underReview + agent.submitted + agent.additionalInfo}">${pendingWidth > 8 ? (agent.underReview + agent.submitted + agent.additionalInfo) : ''}</div>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    renderStatusDistribution: function(agentStats) {
        const totalApproved = agentStats.reduce((sum, a) => sum + a.approved, 0);
        const totalRejected = agentStats.reduce((sum, a) => sum + a.rejected, 0);
        const totalUnderReview = agentStats.reduce((sum, a) => sum + a.underReview, 0);
        const totalSubmitted = agentStats.reduce((sum, a) => sum + a.submitted, 0);
        const totalAdditionalInfo = agentStats.reduce((sum, a) => sum + a.additionalInfo, 0);
        const totalDraft = agentStats.reduce((sum, a) => sum + a.draft, 0);
        const grandTotal = agentStats.reduce((sum, a) => sum + a.total, 0);

        const statuses = [
            { label: 'Approved', count: totalApproved, color: '#10b981' },
            { label: 'Rejected', count: totalRejected, color: '#ef4444' },
            { label: 'Under Review', count: totalUnderReview, color: '#3b82f6' },
            { label: 'Submitted', count: totalSubmitted, color: '#0ea5e9' },
            { label: 'Additional Info', count: totalAdditionalInfo, color: '#f59e0b' },
            { label: 'Draft', count: totalDraft, color: '#64748b' }
        ];

        return `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                ${statuses.map(status => {
                    const percentage = ((status.count / grandTotal) * 100).toFixed(1);
                    return `
                        <div style="padding: 20px; background: ${status.color}15; border-radius: 8px; border-left: 4px solid ${status.color};">
                            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">${status.label}</div>
                            <div style="font-size: 2rem; font-weight: 700; color: ${status.color}; margin-bottom: 4px;">${status.count}</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">${percentage}% of total</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    updateReportPeriod: function(period) {
        this.state.currentReportPeriod = period;
        this.renderReports();
    },

    exportToCSV: function() {
        const agentStats = this.getAgentStats();
        
        // Create CSV content
        let csv = 'Agent Name,Role,Total Applications,Approved,Rejected,Under Review,Submitted,Additional Info,Draft,Approval Rate\n';
        
        agentStats.forEach(agent => {
            const approvalRate = ((agent.approved / agent.total) * 100).toFixed(1);
            csv += `"${agent.name}","${agent.role}",${agent.total},${agent.approved},${agent.rejected},${agent.underReview},${agent.submitted},${agent.additionalInfo},${agent.draft},${approvalRate}%\n`;
        });
        
        // Add summary row
        const totalApps = agentStats.reduce((sum, a) => sum + a.total, 0);
        const totalApproved = agentStats.reduce((sum, a) => sum + a.approved, 0);
        const totalRejected = agentStats.reduce((sum, a) => sum + a.rejected, 0);
        const totalUnderReview = agentStats.reduce((sum, a) => sum + a.underReview, 0);
        const totalSubmitted = agentStats.reduce((sum, a) => sum + a.submitted, 0);
        const totalAdditionalInfo = agentStats.reduce((sum, a) => sum + a.additionalInfo, 0);
        const totalDraft = agentStats.reduce((sum, a) => sum + a.draft, 0);
        const overallApprovalRate = ((totalApproved / totalApps) * 100).toFixed(1);
        
        csv += `\n"TOTAL","All Agents",${totalApps},${totalApproved},${totalRejected},${totalUnderReview},${totalSubmitted},${totalAdditionalInfo},${totalDraft},${overallApprovalRate}%\n`;
        
        // Create download link
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `agent-report-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert('Report exported successfully!');
    },

    handleLogout: function () {
        if (confirm('Are you sure you want to sign out?')) {
            sessionStorage.removeItem('adminLoggedIn');
            sessionStorage.removeItem('userType');
            document.getElementById('admin-app-layout').style.display = 'none';
            document.getElementById('login-screen').style.display = 'flex';
            // Clear form fields
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
    }
};

// Attach admin sign out listener when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const adminSignOutBtn = document.getElementById('admin-sign-out-btn');
    if (adminSignOutBtn) {
        adminSignOutBtn.addEventListener('click', () => admin.handleLogout());
    }
});
