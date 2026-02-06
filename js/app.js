var app = {
    state: {
        inWizard: false,
        currentStep: 1,
        formData: {},
        selectedApplicationId: null,
        filterByUploadRef: null,
        mfaCountdown: 60,
        mfaTimer: null,
        bulkUploads: [
            {
                uploadRefNumber: 'UPL20260130-001',
                fileName: 'batch_upload_v2.csv',
                noOfApplications: 10,
                status: 'Submitted to Bank',
                uploadedDateTime: 'Jan 30, 2026, 10:30 AM'
            },
            {
                uploadRefNumber: 'UPL20260128-002',
                fileName: 'auto_loans_jan.xlsx',
                noOfApplications: 8,
                status: 'Pending Submission to Bank',
                uploadedDateTime: 'Jan 28, 2026, 09:15 AM'
            },
            {
                uploadRefNumber: 'UPL20260125-001',
                fileName: 'personal_loans_batch1.csv',
                noOfApplications: 9,
                status: 'Pending Documents Upload',
                uploadedDateTime: 'Jan 25, 2026, 02:20 PM'
            },
            {
                uploadRefNumber: 'UPL20260120-003',
                fileName: 'legacy_data_import.csv',
                noOfApplications: 3,
                status: 'Cancelled',
                uploadedDateTime: 'Jan 20, 2026, 04:45 PM'
            }
        ],
        applications: [
            {
                id: '#APP-2023-889',
                uploadRefNumber: 'UPL20260130-001',
                customer: {
                    fullName: 'Alice Wong',
                    nric: '123456-78-9012',
                    phone: '+60-12-345-6789',
                    email: 'alice.wong@email.com',
                    residentialAddress: '123 Main Street, Kuala Lumpur, 50050, Malaysia',
                    mailingAddress: '123 Main Street, Kuala Lumpur, 50050, Malaysia',
                    employer: 'Tech Solutions Ltd',
                    salary: 'RM 5,000',
                    occupation: 'Software Engineer'
                },
                loan: {
                    product: 'Personal-i',
                    amountRequested: 'RM 5,000',
                    tenure: '36 months',
                    interestRate: '5.5% (Fixed)',
                    amountApproved: 'RM 5,000',
                    purpose: 'Debt Consolidation',
                    status: 'Approved',
                    submissionDate: 'Oct 28, 2023 10:30 AM'
                }
            },
            {
                id: '#APP-2023-892',
                uploadRefNumber: 'UPL20260130-001',
                customer: {
                    fullName: 'Kumar R.',
                    nric: '987654-32-1098',
                    phone: '+60-12-876-5432',
                    email: 'kumar.r@email.com',
                    residentialAddress: '456 Oak Avenue, Subang Jaya, 47500, Malaysia',
                    mailingAddress: '456 Oak Avenue, Subang Jaya, 47500, Malaysia',
                    employer: 'Financial Services Inc',
                    salary: 'RM 6,500',
                    occupation: 'Financial Analyst'
                },
                loan: {
                    product: 'Home Reno',
                    amountRequested: 'RM 25,000',
                    tenure: '60 months',
                    interestRate: '4.8% (Floating)',
                    amountApproved: null,
                    purpose: 'Home Renovation',
                    status: 'Additional Info Required',
                    submissionDate: 'Oct 28, 2023 09:15 AM'
                },
                bankRemark: 'Income doc unclear',
                bankDescription: 'The income documentation provided is not clear enough to verify the applicant\'s current income level. Please provide recent payslips (last 3 months) along with an employer verification letter to confirm employment and salary details.'
            },
            {
                id: '#APP-2023-901',
                uploadRefNumber: 'UPL20260128-002',
                customer: {
                    fullName: 'Tan Ah Beng',
                    nric: '456789-01-2345',
                    phone: '+60-19-234-5678',
                    email: 'tan.ahbeng@email.com',
                    residentialAddress: '789 Pine Road, Petaling Jaya, 46050, Malaysia',
                    mailingAddress: '789 Pine Road, Petaling Jaya, 46050, Malaysia',
                    employer: 'Self Employed',
                    salary: 'RM 8,000',
                    occupation: 'Business Owner'
                },
                loan: {
                    product: 'Biz Micro',
                    amountRequested: 'RM 50,000',
                    tenure: '48 months',
                    interestRate: '6.5% (Fixed)',
                    amountApproved: null,
                    purpose: 'Business Expansion',
                    status: 'Under Review',
                    submissionDate: 'Oct 27, 2023 04:45 PM'
                }
            },
            {
                id: '#APP-2023-905',
                uploadRefNumber: 'UPL20260128-002',
                customer: {
                    fullName: 'Siti Aminah',
                    nric: '234567-89-0123',
                    phone: '+60-11-567-8901',
                    email: 'siti.aminah@email.com',
                    residentialAddress: '321 Elm Street, Shah Alam, 40000, Malaysia',
                    mailingAddress: '321 Elm Street, Shah Alam, 40000, Malaysia',
                    employer: 'Automotive Corp',
                    salary: 'RM 4,500',
                    occupation: 'Administrative Officer'
                },
                loan: {
                    product: 'Car Loan',
                    amountRequested: 'RM 80,000',
                    tenure: '72 months',
                    interestRate: '3.8% (Fixed)',
                    amountApproved: null,
                    purpose: 'Vehicle Purchase',
                    status: 'Rejected',
                    submissionDate: 'Oct 27, 2023 02:20 PM'
                }
            },
            {
                id: '#APP-2023-910',
                uploadRefNumber: 'UPL20260125-001',
                customer: {
                    fullName: 'John Doe',
                    nric: '345678-90-1234',
                    phone: '+60-13-789-0123',
                    email: 'john.doe@email.com',
                    residentialAddress: '654 Birch Lane, Damansara, 50490, Malaysia',
                    mailingAddress: '654 Birch Lane, Damansara, 50490, Malaysia',
                    employer: 'Retail Chain Ltd',
                    salary: 'RM 3,500',
                    occupation: 'Sales Manager'
                },
                loan: {
                    product: 'Personal',
                    amountRequested: 'RM 12,000',
                    tenure: '24 months',
                    interestRate: '5.2% (Fixed)',
                    amountApproved: null,
                    purpose: 'Personal Expense',
                    status: 'Submitted',
                    submissionDate: 'Oct 26, 2023 11:30 AM'
                }
            },
            {
                id: '#APP-2023-912',
                uploadRefNumber: 'UPL20260125-001',
                customer: {
                    fullName: 'Michelle Tan',
                    nric: '567890-12-3456',
                    phone: '+60-14-901-2345',
                    email: 'michelle.tan@email.com',
                    residentialAddress: '987 Maple Drive, Cyberjaya, 63000, Malaysia',
                    mailingAddress: '987 Maple Drive, Cyberjaya, 63000, Malaysia',
                    employer: 'Tech Startup Inc',
                    salary: 'RM 7,000',
                    occupation: 'Product Manager'
                },
                loan: {
                    product: 'Housing Loan',
                    amountRequested: 'RM 350,000',
                    tenure: '360 months',
                    interestRate: '3.5% (Fixed)',
                    amountApproved: null,
                    purpose: 'Property Purchase',
                    status: 'Draft',
                    submissionDate: null
                }
            },
            {
                id: '#APP-2023-894',
                uploadRefNumber: 'UPL20260130-001',
                customer: {
                    fullName: 'David Lim',
                    nric: '678901-23-4567',
                    phone: '+60-15-234-5678',
                    email: 'david.lim@email.com',
                    residentialAddress: '234 Cedar Lane, PJ, 47100, Malaysia',
                    mailingAddress: '234 Cedar Lane, PJ, 47100, Malaysia',
                    employer: 'Manufacturing Corp',
                    salary: 'RM 7,500',
                    occupation: 'Plant Manager'
                },
                loan: {
                    product: 'Car Loan',
                    amountRequested: 'RM 120,000',
                    tenure: '84 months',
                    interestRate: '3.9% (Fixed)',
                    amountApproved: null,
                    purpose: 'Vehicle Purchase',
                    status: 'Additional Info Required',
                    submissionDate: 'Oct 29, 2023 11:00 AM'
                },
                bankRemark: 'NRIC copy not legible',
                bankDescription: 'The NRIC copy provided is of poor quality and the details are not clearly readable. Please provide a clearer photocopy or color scan of your NRIC with high resolution. Ensure all text is legible and the document is complete.'
            },
            {
                id: '#APP-2023-907',
                uploadRefNumber: 'UPL20260128-002',
                customer: {
                    fullName: 'Priya Sharma',
                    nric: '789012-34-5678',
                    phone: '+60-16-345-6789',
                    email: 'priya.sharma@email.com',
                    residentialAddress: '567 Walnut Street, Klang, 41000, Malaysia',
                    mailingAddress: '567 Walnut Street, Klang, 41000, Malaysia',
                    employer: 'Consulting Services Ltd',
                    salary: 'RM 6,000',
                    occupation: 'Consultant'
                },
                loan: {
                    product: 'Personal-i',
                    amountRequested: 'RM 15,000',
                    tenure: '36 months',
                    interestRate: '5.8% (Fixed)',
                    amountApproved: null,
                    purpose: 'Education Funding',
                    status: 'Additional Info Required',
                    submissionDate: 'Oct 29, 2023 02:30 PM'
                },
                bankRemark: 'Missing payslip for last 3 months',
                bankDescription: 'To verify your current income, we require recent payslips for the last 3 months. Please provide original or certified copies of your recent payslips along with an employer verification letter confirming your employment status and salary.'
            },
            {
                id: '#APP-2023-914',
                uploadRefNumber: 'UPL20260125-001',
                customer: {
                    fullName: 'Wong Mei Lin',
                    nric: '890123-45-6789',
                    phone: '+60-17-456-7890',
                    email: 'mei.lin@email.com',
                    residentialAddress: '678 Chestnut Road, Selangor, 42300, Malaysia',
                    mailingAddress: '678 Chestnut Road, Selangor, 42300, Malaysia',
                    employer: 'Healthcare Services',
                    salary: 'RM 5,500',
                    occupation: 'Nurse'
                },
                loan: {
                    product: 'Home Reno',
                    amountRequested: 'RM 30,000',
                    tenure: '60 months',
                    interestRate: '4.9% (Fixed)',
                    amountApproved: null,
                    purpose: 'Home Renovation',
                    status: 'Additional Info Required',
                    submissionDate: 'Oct 30, 2023 10:15 AM'
                },
                bankRemark: 'Proof of address required',
                bankDescription: 'We require proof of your current residential address. Please submit one of the following: recent utility bill (electricity/water/gas), tenancy agreement, or property tax document dated within the last 3 months.'
            },
            // Additional UPL20260130-001 applications (7 more to reach 10 total)
            {
                id: '#APP-2023-895',
                uploadRefNumber: 'UPL20260130-001',
                customer: {
                    fullName: 'Ahmad Zaki',
                    nric: '901234-56-7890',
                    phone: '+60-12-678-9012',
                    email: 'ahmad.zaki@email.com',
                    residentialAddress: '111 Jalan Ampang, Kuala Lumpur, 50450, Malaysia',
                    mailingAddress: '111 Jalan Ampang, Kuala Lumpur, 50450, Malaysia',
                    employer: 'Government Agency',
                    salary: 'RM 6,200',
                    occupation: 'Civil Servant'
                },
                loan: {
                    product: 'Personal-i',
                    amountRequested: 'RM 18,000',
                    tenure: '48 months',
                    interestRate: '5.3% (Fixed)',
                    amountApproved: 'RM 18,000',
                    purpose: 'Education',
                    status: 'Approved',
                    submissionDate: 'Oct 28, 2023 11:45 AM'
                }
            },
            {
                id: '#APP-2023-896',
                uploadRefNumber: 'UPL20260130-001',
                customer: {
                    fullName: 'Lim Siew Mei',
                    nric: '012345-67-8901',
                    phone: '+60-13-890-1234',
                    email: 'lim.siewmei@email.com',
                    residentialAddress: '222 Taman Desa, Kuala Lumpur, 58100, Malaysia',
                    mailingAddress: '222 Taman Desa, Kuala Lumpur, 58100, Malaysia',
                    employer: 'Banking Sector',
                    salary: 'RM 8,500',
                    occupation: 'Bank Officer'
                },
                loan: {
                    product: 'Car Loan',
                    amountRequested: 'RM 95,000',
                    tenure: '72 months',
                    interestRate: '3.7% (Fixed)',
                    amountApproved: 'RM 90,000',
                    purpose: 'Vehicle Purchase',
                    status: 'Approved',
                    submissionDate: 'Oct 28, 2023 01:20 PM'
                }
            },
            {
                id: '#APP-2023-897',
                uploadRefNumber: 'UPL20260130-001',
                customer: {
                    fullName: 'Raj Kumar',
                    nric: '123456-78-9013',
                    phone: '+60-14-012-3456',
                    email: 'raj.kumar@email.com',
                    residentialAddress: '333 Bangsar South, Kuala Lumpur, 59200, Malaysia',
                    mailingAddress: '333 Bangsar South, Kuala Lumpur, 59200, Malaysia',
                    employer: 'IT Consulting',
                    salary: 'RM 9,000',
                    occupation: 'IT Consultant'
                },
                loan: {
                    product: 'Personal',
                    amountRequested: 'RM 20,000',
                    tenure: '36 months',
                    interestRate: '5.0% (Fixed)',
                    amountApproved: null,
                    purpose: 'Debt Consolidation',
                    status: 'Under Review',
                    submissionDate: 'Oct 28, 2023 02:30 PM'
                }
            },
            {
                id: '#APP-2023-898',
                uploadRefNumber: 'UPL20260130-001',
                customer: {
                    fullName: 'Nurul Huda',
                    nric: '234567-89-0124',
                    phone: '+60-15-234-5679',
                    email: 'nurul.huda@email.com',
                    residentialAddress: '444 Wangsa Maju, Kuala Lumpur, 53300, Malaysia',
                    mailingAddress: '444 Wangsa Maju, Kuala Lumpur, 53300, Malaysia',
                    employer: 'Education Sector',
                    salary: 'RM 4,800',
                    occupation: 'Teacher'
                },
                loan: {
                    product: 'Personal-i',
                    amountRequested: 'RM 10,000',
                    tenure: '24 months',
                    interestRate: '5.5% (Fixed)',
                    amountApproved: 'RM 10,000',
                    purpose: 'Medical Expenses',
                    status: 'Approved',
                    submissionDate: 'Oct 28, 2023 03:15 PM'
                }
            },
            {
                id: '#APP-2023-899',
                uploadRefNumber: 'UPL20260130-001',
                customer: {
                    fullName: 'Chen Wei',
                    nric: '345678-90-1235',
                    phone: '+60-16-456-7890',
                    email: 'chen.wei@email.com',
                    residentialAddress: '555 Mont Kiara, Kuala Lumpur, 50480, Malaysia',
                    mailingAddress: '555 Mont Kiara, Kuala Lumpur, 50480, Malaysia',
                    employer: 'Real Estate',
                    salary: 'RM 12,000',
                    occupation: 'Property Agent'
                },
                loan: {
                    product: 'Biz Micro',
                    amountRequested: 'RM 40,000',
                    tenure: '48 months',
                    interestRate: '6.2% (Fixed)',
                    amountApproved: null,
                    purpose: 'Business Capital',
                    status: 'Submitted',
                    submissionDate: 'Oct 28, 2023 04:00 PM'
                }
            },
            {
                id: '#APP-2023-900',
                uploadRefNumber: 'UPL20260130-001',
                customer: {
                    fullName: 'Fatimah Zahra',
                    nric: '456789-01-2346',
                    phone: '+60-17-678-9012',
                    email: 'fatimah.zahra@email.com',
                    residentialAddress: '666 Cheras, Kuala Lumpur, 56100, Malaysia',
                    mailingAddress: '666 Cheras, Kuala Lumpur, 56100, Malaysia',
                    employer: 'Retail Industry',
                    salary: 'RM 3,800',
                    occupation: 'Store Manager'
                },
                loan: {
                    product: 'Personal',
                    amountRequested: 'RM 8,000',
                    tenure: '24 months',
                    interestRate: '5.8% (Fixed)',
                    amountApproved: null,
                    purpose: 'Personal Expense',
                    status: 'Rejected',
                    submissionDate: 'Oct 28, 2023 04:45 PM'
                }
            },
            // Additional UPL20260128-002 applications (5 more to reach 8 total)
            {
                id: '#APP-2023-902',
                uploadRefNumber: 'UPL20260128-002',
                customer: {
                    fullName: 'Hassan Ibrahim',
                    nric: '567890-12-3457',
                    phone: '+60-18-901-2345',
                    email: 'hassan.ibrahim@email.com',
                    residentialAddress: '777 Setapak, Kuala Lumpur, 53000, Malaysia',
                    mailingAddress: '777 Setapak, Kuala Lumpur, 53000, Malaysia',
                    employer: 'Transportation',
                    salary: 'RM 5,200',
                    occupation: 'Logistics Manager'
                },
                loan: {
                    product: 'Car Loan',
                    amountRequested: 'RM 70,000',
                    tenure: '84 months',
                    interestRate: '3.9% (Fixed)',
                    amountApproved: 'RM 70,000',
                    purpose: 'Vehicle Purchase',
                    status: 'Approved',
                    submissionDate: 'Oct 27, 2023 10:30 AM'
                }
            },
            {
                id: '#APP-2023-903',
                uploadRefNumber: 'UPL20260128-002',
                customer: {
                    fullName: 'Lee Hui Ling',
                    nric: '678901-23-4568',
                    phone: '+60-19-123-4567',
                    email: 'lee.huiling@email.com',
                    residentialAddress: '888 Kepong, Kuala Lumpur, 52100, Malaysia',
                    mailingAddress: '888 Kepong, Kuala Lumpur, 52100, Malaysia',
                    employer: 'Manufacturing',
                    salary: 'RM 4,500',
                    occupation: 'Production Supervisor'
                },
                loan: {
                    product: 'Personal-i',
                    amountRequested: 'RM 15,000',
                    tenure: '36 months',
                    interestRate: '5.6% (Fixed)',
                    amountApproved: null,
                    purpose: 'Home Improvement',
                    status: 'Under Review',
                    submissionDate: 'Oct 27, 2023 11:15 AM'
                }
            },
            {
                id: '#APP-2023-904',
                uploadRefNumber: 'UPL20260128-002',
                customer: {
                    fullName: 'Muthu Krishnan',
                    nric: '789012-34-5679',
                    phone: '+60-11-345-6789',
                    email: 'muthu.krishnan@email.com',
                    residentialAddress: '999 Sentul, Kuala Lumpur, 51000, Malaysia',
                    mailingAddress: '999 Sentul, Kuala Lumpur, 51000, Malaysia',
                    employer: 'Construction',
                    salary: 'RM 6,800',
                    occupation: 'Site Engineer'
                },
                loan: {
                    product: 'Home Reno',
                    amountRequested: 'RM 35,000',
                    tenure: '60 months',
                    interestRate: '4.7% (Fixed)',
                    amountApproved: 'RM 35,000',
                    purpose: 'Home Renovation',
                    status: 'Approved',
                    submissionDate: 'Oct 27, 2023 01:45 PM'
                }
            },
            {
                id: '#APP-2023-906',
                uploadRefNumber: 'UPL20260128-002',
                customer: {
                    fullName: 'Sarah Tan',
                    nric: '890123-45-6780',
                    phone: '+60-12-567-8901',
                    email: 'sarah.tan@email.com',
                    residentialAddress: '101 Bukit Jalil, Kuala Lumpur, 57000, Malaysia',
                    mailingAddress: '101 Bukit Jalil, Kuala Lumpur, 57000, Malaysia',
                    employer: 'Hospitality',
                    salary: 'RM 5,500',
                    occupation: 'Hotel Manager'
                },
                loan: {
                    product: 'Personal',
                    amountRequested: 'RM 22,000',
                    tenure: '48 months',
                    interestRate: '5.4% (Fixed)',
                    amountApproved: null,
                    purpose: 'Wedding',
                    status: 'Submitted',
                    submissionDate: 'Oct 27, 2023 03:30 PM'
                }
            },
            // Additional UPL20260125-001 applications (6 more to reach 9 total)
            {
                id: '#APP-2023-911',
                uploadRefNumber: 'UPL20260125-001',
                customer: {
                    fullName: 'Azman Yusof',
                    nric: '901234-56-7891',
                    phone: '+60-13-789-0123',
                    email: 'azman.yusof@email.com',
                    residentialAddress: '202 Ampang, Kuala Lumpur, 68000, Malaysia',
                    mailingAddress: '202 Ampang, Kuala Lumpur, 68000, Malaysia',
                    employer: 'Telecommunications',
                    salary: 'RM 7,200',
                    occupation: 'Network Engineer'
                },
                loan: {
                    product: 'Car Loan',
                    amountRequested: 'RM 85,000',
                    tenure: '72 months',
                    interestRate: '3.8% (Fixed)',
                    amountApproved: 'RM 85,000',
                    purpose: 'Vehicle Purchase',
                    status: 'Approved',
                    submissionDate: 'Oct 26, 2023 09:00 AM'
                }
            },
            {
                id: '#APP-2023-913',
                uploadRefNumber: 'UPL20260125-001',
                customer: {
                    fullName: 'Kavitha Devi',
                    nric: '012345-67-8902',
                    phone: '+60-14-901-2346',
                    email: 'kavitha.devi@email.com',
                    residentialAddress: '303 Puchong, Selangor, 47100, Malaysia',
                    mailingAddress: '303 Puchong, Selangor, 47100, Malaysia',
                    employer: 'Pharmaceutical',
                    salary: 'RM 6,500',
                    occupation: 'Pharmacist'
                },
                loan: {
                    product: 'Personal-i',
                    amountRequested: 'RM 25,000',
                    tenure: '48 months',
                    interestRate: '5.2% (Fixed)',
                    amountApproved: null,
                    purpose: 'Business Investment',
                    status: 'Under Review',
                    submissionDate: 'Oct 26, 2023 10:45 AM'
                }
            },
            {
                id: '#APP-2023-915',
                uploadRefNumber: 'UPL20260125-001',
                customer: {
                    fullName: 'Daniel Ng',
                    nric: '123456-78-9014',
                    phone: '+60-15-123-4568',
                    email: 'daniel.ng@email.com',
                    residentialAddress: '404 Subang Jaya, Selangor, 47500, Malaysia',
                    mailingAddress: '404 Subang Jaya, Selangor, 47500, Malaysia',
                    employer: 'Aviation',
                    salary: 'RM 9,500',
                    occupation: 'Pilot'
                },
                loan: {
                    product: 'Housing Loan',
                    amountRequested: 'RM 450,000',
                    tenure: '360 months',
                    interestRate: '3.3% (Fixed)',
                    amountApproved: 'RM 450,000',
                    purpose: 'Property Purchase',
                    status: 'Approved',
                    submissionDate: 'Oct 26, 2023 01:30 PM'
                }
            },
            {
                id: '#APP-2023-916',
                uploadRefNumber: 'UPL20260125-001',
                customer: {
                    fullName: 'Aisha Rahman',
                    nric: '234567-89-0125',
                    phone: '+60-16-345-6780',
                    email: 'aisha.rahman@email.com',
                    residentialAddress: '505 Shah Alam, Selangor, 40000, Malaysia',
                    mailingAddress: '505 Shah Alam, Selangor, 40000, Malaysia',
                    employer: 'Legal Firm',
                    salary: 'RM 8,000',
                    occupation: 'Lawyer'
                },
                loan: {
                    product: 'Biz Micro',
                    amountRequested: 'RM 55,000',
                    tenure: '60 months',
                    interestRate: '6.0% (Fixed)',
                    amountApproved: null,
                    purpose: 'Business Expansion',
                    status: 'Submitted',
                    submissionDate: 'Oct 26, 2023 02:15 PM'
                }
            },
            {
                id: '#APP-2023-917',
                uploadRefNumber: 'UPL20260125-001',
                customer: {
                    fullName: 'Vincent Chong',
                    nric: '345678-90-1236',
                    phone: '+60-17-567-8902',
                    email: 'vincent.chong@email.com',
                    residentialAddress: '606 Klang, Selangor, 41000, Malaysia',
                    mailingAddress: '606 Klang, Selangor, 41000, Malaysia',
                    employer: 'Insurance',
                    salary: 'RM 7,800',
                    occupation: 'Insurance Agent'
                },
                loan: {
                    product: 'Personal',
                    amountRequested: 'RM 18,000',
                    tenure: '36 months',
                    interestRate: '5.3% (Fixed)',
                    amountApproved: null,
                    purpose: 'Travel',
                    status: 'Rejected',
                    submissionDate: 'Oct 26, 2023 03:45 PM'
                }
            },
            // Additional UPL20260120-003 applications (2 more to reach 3 total)
            {
                id: '#APP-2023-856',
                uploadRefNumber: 'UPL20260120-003',
                customer: {
                    fullName: 'Salmah Ismail',
                    nric: '456789-01-2347',
                    phone: '+60-18-789-0124',
                    email: 'salmah.ismail@email.com',
                    residentialAddress: '707 Kajang, Selangor, 43000, Malaysia',
                    mailingAddress: '707 Kajang, Selangor, 43000, Malaysia',
                    employer: 'Government',
                    salary: 'RM 5,000',
                    occupation: 'Administrative Officer'
                },
                loan: {
                    product: 'Personal-i',
                    amountRequested: 'RM 12,000',
                    tenure: '36 months',
                    interestRate: '5.5% (Fixed)',
                    amountApproved: null,
                    purpose: 'Education',
                    status: 'Cancelled',
                    submissionDate: 'Oct 20, 2023 10:30 AM'
                }
            },
            {
                id: '#APP-2023-857',
                uploadRefNumber: 'UPL20260120-003',
                customer: {
                    fullName: 'Robert Tan',
                    nric: '567890-12-3458',
                    phone: '+60-19-012-3457',
                    email: 'robert.tan@email.com',
                    residentialAddress: '808 Seremban, Negeri Sembilan, 70000, Malaysia',
                    mailingAddress: '808 Seremban, Negeri Sembilan, 70000, Malaysia',
                    employer: 'Engineering',
                    salary: 'RM 6,000',
                    occupation: 'Mechanical Engineer'
                },
                loan: {
                    product: 'Car Loan',
                    amountRequested: 'RM 75,000',
                    tenure: '72 months',
                    interestRate: '3.9% (Fixed)',
                    amountApproved: null,
                    purpose: 'Vehicle Purchase',
                    status: 'Cancelled',
                    submissionDate: 'Oct 20, 2023 11:45 AM'
                }
            }
        ],
        messages: [
            {
                id: 1,
                from: 'Bank Administrator',
                subject: 'Application #APP-2023-889 Approved',
                content: 'Your application has been approved. Please visit the office to collect your loan approval letter.',
                timestamp: 'Feb 1, 2026, 2:30 PM',
                read: false,
                type: 'approval'
            },
            {
                id: 2,
                from: 'System Notification',
                subject: 'Batch Upload UPL20260130-001 Complete',
                content: 'Your bulk upload has been successfully processed. 10 applications have been submitted for review.',
                timestamp: 'Jan 30, 2026, 10:45 AM',
                read: false,
                type: 'notification'
            },
            {
                id: 3,
                from: 'Bank Review Team',
                subject: 'Additional Documents Required',
                content: 'We need more documentation to process your application. Please upload the requested documents as soon as possible.',
                timestamp: 'Jan 28, 2026, 4:15 PM',
                read: true,
                type: 'alert'
            },
            {
                id: 4,
                from: 'Agent Support',
                subject: 'System Maintenance Scheduled',
                content: 'The portal will be undergoing maintenance on Feb 3 from 11 PM to 2 AM. Service may be unavailable during this time.',
                timestamp: 'Jan 25, 2026, 9:00 AM',
                read: true,
                type: 'notification'
            },
            {
                id: 5,
                from: 'Bank Administrator',
                subject: 'New Product Launch: Housing Loan Plus',
                content: 'We are excited to announce our new Housing Loan Plus product with competitive rates. Learn more in your dashboard.',
                timestamp: 'Jan 20, 2026, 11:30 AM',
                read: true,
                type: 'info'
            }
        ]
    },

    init: function () {
        console.log('MR Portal Initialized');
        // Show login screen first, hide app layout and MFA screen
        const loginScreen = document.getElementById('login-screen');
        const appLayout = document.getElementById('app-layout');
        const mfaScreen = document.getElementById('mfa-screen');
        
        if (loginScreen) loginScreen.style.display = 'flex';
        if (appLayout) appLayout.style.display = 'none';
        if (mfaScreen) mfaScreen.style.display = 'none';
    },

    // Shared metrics calculation function
    calculateMetrics: function() {
        const apps = this.state.applications;
        const totalSubmitted = apps.filter(a => a.loan.submissionDate !== null).length;
        const approved = apps.filter(a => a.loan.status === 'Approved').length;
        const pending = apps.filter(a => a.loan.status === 'Under Review' || a.loan.status === 'Submitted').length;
        const additionalInfo = apps.filter(a => a.loan.status === 'Additional Info Required').length;
        const rejected = apps.filter(a => a.loan.status === 'Rejected').length;
        
        const approvalRate = totalSubmitted > 0 ? ((approved / totalSubmitted) * 100).toFixed(1) : 0;
        const rejectionRate = totalSubmitted > 0 ? ((rejected / totalSubmitted) * 100).toFixed(1) : 0;
        
        // Commission calculations
        const approvedApps = apps.filter(a => a.loan.status === 'Approved');
        const commissionRates = {
            'Personal-i': 1.5,
            'Home Reno': 2.0,
            'Biz Micro': 2.5,
            'Car Loan': 1.8,
            'Personal': 1.5,
            'Housing Loan': 2.2
        };
        
        let totalMTDCommission = 0;
        let totalYTDCommission = 0;
        let commissionByProduct = {};
        
        approvedApps.forEach(app => {
            const product = app.loan.product;
            const amountStr = app.loan.amountApproved || app.loan.amountRequested;
            const amount = parseFloat(amountStr.replace(/[RM,\s]/g, ''));
            const rate = commissionRates[product] || 1.5;
            const commission = (amount * rate) / 100;
            
            totalMTDCommission += commission;
            totalYTDCommission += commission; // For demo, assuming MTD = YTD
            
            if (!commissionByProduct[product]) {
                commissionByProduct[product] = { count: 0, commission: 0 };
            }
            commissionByProduct[product].count++;
            commissionByProduct[product].commission += commission;
        });
        
        return {
            totalSubmitted,
            approved,
            pending: pending + additionalInfo, // Combine pending and additional info
            additionalInfo, // Keep separate for display
            rejected,
            approvalRate,
            rejectionRate,
            totalMTDCommission,
            totalYTDCommission,
            commissionByProduct,
            approvedApps
        };
    },

    login: function () {
        console.log('Login function called');
        // Simulate Login
        const btn = document.querySelector('.login-form button');
        if (!btn) {
            console.error('Sign in button not found');
            return;
        }
        const originalText = btn.innerText;
        btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Signing In...';

        setTimeout(() => {
            // Hide login screen and show MFA screen
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('mfa-screen').style.display = 'flex';
            btn.innerText = originalText;
            
            // Start MFA countdown
            this.startMfaCountdown();
            
            // Focus on PIN input
            const pinInput = document.getElementById('mfa-pin');
            if (pinInput) pinInput.focus();
        }, 800);
    },

    startMfaCountdown: function () {
        this.state.mfaCountdown = 60;
        const timerElement = document.getElementById('countdown-timer');
        const resendBtn = document.getElementById('resend-code');
        
        if (resendBtn) resendBtn.disabled = true;
        
        this.state.mfaTimer = setInterval(() => {
            this.state.mfaCountdown--;
            if (timerElement) {
                timerElement.textContent = this.state.mfaCountdown;
            }
            
            if (this.state.mfaCountdown <= 0) {
                clearInterval(this.state.mfaTimer);
                if (timerElement) {
                    timerElement.textContent = '0';
                    timerElement.style.color = '#ef4444';
                }
                if (resendBtn) {
                    resendBtn.disabled = false;
                    resendBtn.textContent = 'Resend Code';
                }
            }
        }, 1000);
    },

    verifyMfaPin: function () {
        const pinInput = document.getElementById('mfa-pin');
        const btn = document.getElementById('verify-pin-btn');
        
        if (!pinInput || !btn) return;
        
        const pin = pinInput.value.trim();
        const originalText = btn.innerText;
        
        if (pin.length !== 6) {
            this.showMfaError('Please enter a 6-digit PIN');
            return;
        }
        
        btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Verifying...';
        
        setTimeout(() => {
            if (pin === '000000') {
                // Correct PIN - proceed to dashboard
                clearInterval(this.state.mfaTimer);
                document.getElementById('mfa-screen').style.display = 'none';
                document.getElementById('app-layout').style.display = 'flex';
                this.navigate('dashboard');
            } else {
                // Incorrect PIN
                this.showMfaError('Invalid PIN. Please try again.');
                pinInput.value = '';
                pinInput.focus();
            }
            btn.innerText = originalText;
        }, 1000);
    },

    showMfaError: function (message) {
        const pinInput = document.getElementById('mfa-pin');
        if (pinInput) {
            pinInput.style.borderColor = '#ef4444';
            pinInput.style.backgroundColor = '#fef2f2';
            
            // Create or update error message
            let errorMsg = document.getElementById('mfa-error');
            if (!errorMsg) {
                errorMsg = document.createElement('p');
                errorMsg.id = 'mfa-error';
                errorMsg.style.cssText = 'color: #ef4444; font-size: 0.8rem; margin: 8px 0 0 0; text-align: center;';
                pinInput.parentNode.appendChild(errorMsg);
            }
            errorMsg.textContent = message;
            
            // Reset styling after 3 seconds
            setTimeout(() => {
                pinInput.style.borderColor = '';
                pinInput.style.backgroundColor = '';
                if (errorMsg) errorMsg.remove();
            }, 3000);
        }
    },

    resendMfaCode: function () {
        const btn = document.getElementById('resend-code');
        if (btn) {
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Sending...';
            setTimeout(() => {
                btn.textContent = 'Code Sent!';
                this.startMfaCountdown();
                setTimeout(() => {
                    btn.textContent = 'Resend Code';
                }, 2000);
            }, 1000);
        }
    },

    backToLogin: function () {
        clearInterval(this.state.mfaTimer);
        document.getElementById('mfa-screen').style.display = 'none';
        document.getElementById('login-screen').style.display = 'flex';
        
        // Reset MFA form
        const pinInput = document.getElementById('mfa-pin');
        if (pinInput) {
            pinInput.value = '';
            pinInput.style.borderColor = '';
            pinInput.style.backgroundColor = '';
        }
        
        const errorMsg = document.getElementById('mfa-error');
        if (errorMsg) errorMsg.remove();
    },

    // Notification dropdown functions
    toggleNotificationsDropdown: function (event) {
        event.preventDefault();
        event.stopPropagation();
        
        const dropdown = document.getElementById('notifications-dropdown');
        if (!dropdown) return;
        
        const isVisible = dropdown.classList.contains('show');
        
        if (isVisible) {
            dropdown.classList.remove('show');
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 200);
        } else {
            dropdown.style.display = 'block';
            // Force reflow to ensure display change takes effect
            dropdown.offsetHeight;
            dropdown.classList.add('show');
        }
    },

    closeNotificationsDropdown: function () {
        const dropdown = document.getElementById('notifications-dropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 200);
        }
    },

    markAllNotificationsRead: function () {
        // Update notification badge
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = '0';
            badge.style.display = 'none';
        }
        
        // Update notification count
        const count = document.querySelector('.notification-count');
        if (count) {
            count.textContent = 'No new notifications';
        }
        
        // Remove unread styling from all notifications
        document.querySelectorAll('.notification-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        
        // Show success message
        alert('All notifications marked as read');
    },

    logout: function () {
        // Clear MFA timer if running
        if (this.state.mfaTimer) {
            clearInterval(this.state.mfaTimer);
            this.state.mfaTimer = null;
        }
        
        // Return to Login
        document.getElementById('app-layout').style.display = 'none';
        document.getElementById('mfa-screen').style.display = 'none';
        document.getElementById('login-screen').style.display = 'flex';
        
        // Reset view state if needed
        this.state.inWizard = false;
    },

    navigate: function (viewId, appId = null) {
        console.log('Navigate called with viewId:', viewId, 'appId:', appId);
        
        // Get elements
        const content = document.getElementById('app-content');
        const title = document.getElementById('page-title');
        
        if (!content) {
            console.error('app-content element not found');
            return;
        }
        
        // Update Nav State
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        const activeLink = document.querySelector(`[data-navigate="${viewId}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Reset Wizard state if leaving wizard
        if (viewId !== 'applications') {
            this.state.inWizard = false;
        }

        let html = '';
        
        if (viewId === 'dashboard') {
            if (title) title.textContent = 'Dashboard';
            html = this.views.dashboard();
        } else if (viewId === 'applications') {
            if (title) title.textContent = 'Bulk Upload';
            html = this.views.applications();
        } else if (viewId === 'tracking') {
            if (title) title.textContent = 'Application Tracking';
            html = this.views.tracking();
        } else if (viewId === 'query'){
            if (title) title.textContent = 'Application Query';
            html = this.views.query();
        } else if (viewId === 'performance'){
            if (title) title.textContent = 'Performance & Commission Monitoring';
            html = this.views.performance();
        } else if (viewId === 'queryDetails' && appId) {
            this.state.selectedApplicationId = appId;
            if (title) title.textContent = 'Application Query - Bank Feedback';
            html = this.views.queryDetails(appId);
        } else if (viewId === 'applicationDetails' && appId) {
            this.state.selectedApplicationId = appId;
            if (title) title.textContent = 'Application Details';
            html = this.views.applicationDetails(appId);
        }
        
        if (html) {
            content.innerHTML = html;
            console.log('Content rendered for view:', viewId);
        } else {
            console.warn('No HTML returned for view:', viewId);
        }
    },

    views: {
        dashboard: function () {
            const metrics = app.calculateMetrics();
            
            return `
                <div class="page-wrapper">
                    <div class="flex justify-between items-center" style="margin-bottom: 24px;">
                        <h2>Dashboard Overview</h2>
                    </div>
                    <!-- Top Row: KPIs -->
                    <div class="kpi-grid">
                        <div class="card kpi-card">
                            <span class="kpi-label">Submitted</span>
                            <span class="kpi-value">${metrics.totalSubmitted}</span>
                            <span class="kpi-trend trend-up"><i class="ph ph-check-circle"></i> This Month</span>
                        </div>
                        <div class="card kpi-card">
                            <span class="kpi-label">Approved</span>
                            <span class="kpi-value text-success">${metrics.approved}</span>
                            <span class="kpi-trend trend-up"><i class="ph ph-trend-up"></i> ${metrics.approvalRate}% Rate</span>
                        </div>
                        <div class="card kpi-card">
                            <span class="kpi-label">Total Processing</span>
                            <span class="kpi-value" style="color: var(--warning-color)">${metrics.pending + metrics.additionalInfo}</span>
                            <span class="kpi-trend"><i class="ph ph-clock"></i> In Progress</span>
                        </div>
                        <div class="card kpi-card">
                            <span class="kpi-label">Rejected</span>
                            <span class="kpi-value" style="color: var(--danger-color)">${metrics.rejected}</span>
                            <span class="kpi-trend trend-down"><i class="ph ph-x-circle"></i> ${metrics.rejectionRate}% Rate</span>
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
                                <a href="#" onclick="app.navigate('tracking')" style="font-size: 0.8rem; color: var(--accent-color);">View All</a>
                            </div>
                            <div class="table-container" style="flex: 1;">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>App ID</th>
                                            <th>Customer Name</th>
                                            <th>Product</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#APP-2023-889</td>
                                            <td>Alice Wong</td>
                                            <td>Personal-i</td>
                                            <td><span class="badge badge-success">Approved</span></td>
                                        </tr>
                                        <tr>
                                            <td>#APP-2023-892</td>
                                            <td>Kumar R.</td>
                                            <td>Home Reno</td>
                                            <td><span class="badge badge-warning">Additional Information Required</span></td>
                                        </tr>
                                        <tr>
                                            <td>#APP-2023-901</td>
                                            <td>Tan Ah Beng</td>
                                            <td>Biz Micro</td>
                                            <td><span class="badge badge-blue">Under Review</span></td>
                                        </tr>
                                        <tr>
                                            <td>#APP-2023-910</td>
                                            <td>John Doe</td>
                                            <td>Personal</td>
                                            <td><span class="badge badge-blue" style="background: #e0f2fe; color: #0284c7;">Submitted</span></td>
                                        </tr>
                                         <tr>
                                            <td>#APP-2023-912</td>
                                            <td>Michelle Tan</td>
                                            <td>Housing Loan</td>
                                            <td><span class="badge" style="background: #f1f5f9; color: #64748b;">Draft</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        },

        tracking: function () {
            const filterRef = app.state.filterByUploadRef;
            const filterTitle = filterRef ? ` - Filtered by Upload: ${filterRef}` : '';
            const clearFilterBtn = filterRef ? `<button class="btn btn-outline" onclick="app.clearUploadFilter()" style="margin-left: 12px;"><i class="ph ph-x"></i> Clear Filter</button>` : '';

            return `
                <div class="page-wrapper">
                <div class="flex justify-between items-center" style="margin-bottom: 24px;">
                    <h2>Application Tracking${filterTitle}</h2>
                    ${clearFilterBtn}
                </div>

                <!-- Search / Filter Section -->
                <div class="card" style="margin-bottom: 24px; padding: 24px;">
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div class="form-grid-dense" style="grid-template-columns: repeat(5, 1fr); margin: 0; gap: 16px;">
                            <div class="form-group stacked">
                                <label style="text-align: left;">Upload Reference</label>
                                <input type="text" placeholder="e.g. UPL20260130-001" style="width: 100%;" ${filterRef ? `value="${filterRef}" disabled` : ''}>
                            </div>
                            <div class="form-group stacked">
                                <label style="text-align: left;">Application ID</label>
                                <input type="text" placeholder="e.g. #APP-2023-..." style="width: 100%;">
                            </div>
                            <div class="form-group stacked">
                                <label style="text-align: left;">Customer Name</label>
                                <input type="text" placeholder="e.g. Alice Wong" style="width: 100%;">
                            </div>
                            <div class="form-group stacked">
                                <label style="text-align: left;">Status</label>
                                <select style="width: 100%;">
                                    <option value="">All Statuses</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Submitted">Submitted</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Additional Info">Additional Info Required</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div class="form-group stacked">
                                <label style="text-align: left;">Submission Date</label>
                                <input type="date" style="width: 100%;">
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end;">
                            <button class="btn btn-primary" style="height: 42px; padding: 0 24px;">
                                <i class="ph ph-magnifying-glass"></i> Search
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results Table -->
                <div class="card" style="padding: 0; overflow: hidden;">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Upload Reference Number</th>
                                    <th>Application ID</th>
                                    <th>Customer Name</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Submission Date/Time</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="font-weight: 500;">UPL20260130-001</td>
                                    <td style="font-weight: 500;">#APP-2023-889</td>
                                    <td>Alice Wong</td>
                                    <td>Personal-i</td>
                                    <td>$5,000</td>
                                    <td><span class="badge badge-success">Approved</span></td>
                                    <td>Oct 28, 2023 10:30 AM</td>
                                    <td><button class="icon-btn" onclick="app.navigate('applicationDetails', '#APP-2023-889')"><i class="ph ph-caret-right"></i></button></td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 500;">UPL20260130-001</td>
                                    <td style="font-weight: 500;">#APP-2023-892</td>
                                    <td>Kumar R.</td>
                                    <td>Home Reno</td>
                                    <td>$25,000</td>
                                    <td><span class="badge badge-warning">Additional Info Required</span></td>
                                    <td>Oct 28, 2023 09:15 AM</td>
                                    <td><button class="icon-btn" onclick="app.navigate('applicationDetails', '#APP-2023-892')"><i class="ph ph-caret-right"></i></button></td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 500;">UPL20260128-002</td>
                                    <td style="font-weight: 500;">#APP-2023-901</td>
                                    <td>Tan Ah Beng</td>
                                    <td>Biz Micro</td>
                                    <td>$50,000</td>
                                    <td><span class="badge badge-blue">Under Review</span></td>
                                    <td>Oct 27, 2023 04:45 PM</td>
                                    <td><button class="icon-btn" onclick="app.navigate('applicationDetails', '#APP-2023-901')"><i class="ph ph-caret-right"></i></button></td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 500;">UPL20260128-002</td>
                                    <td style="font-weight: 500;">#APP-2023-905</td>
                                    <td>Siti Aminah</td>
                                    <td>Car Loan</td>
                                    <td>$80,000</td>
                                    <td><span class="badge badge-error" style="background: #fee2e2; color: #ef4444;">Rejected</span></td>
                                    <td>Oct 27, 2023 02:20 PM</td>
                                    <td><button class="icon-btn" onclick="app.navigate('applicationDetails', '#APP-2023-905')"><i class="ph ph-caret-right"></i></button></td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 500;">UPL20260125-001</td>
                                    <td style="font-weight: 500;">#APP-2023-910</td>
                                    <td>John Doe</td>
                                    <td>Personal</td>
                                    <td>$12,000</td>
                                    <td><span class="badge badge-blue" style="background: #e0f2fe; color: #0284c7;">Submitted</span></td>
                                    <td>Oct 26, 2023 11:30 AM</td>
                                    <td><button class="icon-btn" onclick="app.navigate('applicationDetails', '#APP-2023-910')"><i class="ph ph-caret-right"></i></button></td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 500;">UPL20260125-001</td>
                                    <td style="font-weight: 500;">#APP-2023-912</td>
                                    <td>Michelle Tan</td>
                                    <td>Housing Loan</td>
                                    <td>$350,000</td>
                                    <td><span class="badge" style="background: #f1f5f9; color: #64748b;">Draft</span></td>
                                    <td>-</td>
                                    <td><button class="icon-btn" onclick="app.navigate('applicationDetails', '#APP-2023-912')"><i class="ph ph-caret-right"></i></button></td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 500;">UPL20260120-003</td>
                                    <td style="font-weight: 500;">#APP-2023-855</td>
                                    <td>Rajesh K.</td>
                                    <td>Personal-i</td>
                                    <td>$10,000</td>
                                    <td><span class="badge" style="background: #fee2e2; color: #991b1b;">Cancelled</span></td>
                                    <td>Oct 20, 2023 09:00 AM</td>
                                    <td><button class="icon-btn"><i class="ph ph-caret-right"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="padding: 16px 24px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 0.85rem;">
                        <span>Showing 1-7 of 128 results</span>
                        <div style="display: flex; gap: 8px;">
                            <button class="icon-btn" disabled><i class="ph ph-caret-left"></i></button>
                            <button class="icon-btn"><i class="ph ph-caret-right"></i></button>
                        </div>
                    </div>
                </div>
                </div>
            `;
        },

        queryDetails: function (appId) {
            const application = app.state.applications.find(a => a.id === appId);
            if (!application) return '<div class="card">Application not found.</div>';
            if (application.loan.status !== 'Additional Info Required') {
                return '<div class="card">This application does not require additional information.</div>';
            }

            const { customer, loan, bankRemark, bankDescription } = application;
            return `
                <div class="page-wrapper">
                <div style="margin-bottom: 24px;">
                    <button class="btn btn-secondary" onclick="app.navigate('query')" style="display: flex; align-items: center; gap: 8px;">
                        <i class="ph ph-arrow-left"></i> Back to Query
                    </button>
                </div>

                <!-- Bank Feedback Section -->
                <div class="card" style="margin-bottom: 24px; border-left: 4px solid #f59e0b;">
                    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 16px;">
                        <h3 style="margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                            <i class="ph ph-warning" style="color: #f59e0b;"></i>
                            Bank Feedback
                        </h3>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Bank Remark (Summary)</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem; padding: 12px; background: #fef3c7; border-left: 3px solid #f59e0b; border-radius: 4px; color: #92400e;">${bankRemark}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Bank Description (Detailed)</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem; padding: 12px; background: #f3f4f6; border-radius: 4px; line-height: 1.6; color: #374151;">${bankDescription}</p>
                        </div>
                    </div>
                </div>

                <!-- Document Management Section -->
                <div class="card" style="margin-bottom: 24px;">
                    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 16px;">
                        <h3 style="margin: 0; font-size: 1.1rem;">Document Management</h3>
                    </div>
                    
                    <!-- Upload Additional Documents -->
                    <div style="margin-bottom: 24px;">
                        <h4 style="margin: 0 0 12px 0; font-size: 0.95rem; color: #374151;">Upload Additional Documents</h4>
                        <div style="padding: 24px; border: 2px dashed #cbd5e1; border-radius: 8px; text-align: center; background: #f9fafb;">
                            <i class="ph ph-upload-simple" style="font-size: 32px; color: #9ca3af; margin-bottom: 12px;"></i>
                            <p style="margin: 0 0 12px 0; color: #374151; font-weight: 500;">Click or drag files to upload</p>
                            <button class="btn btn-outline" style="padding: 8px 16px; font-size: 0.85rem;" onclick="alert('File upload functionality would be implemented here')">
                                <i class="ph ph-plus"></i> Choose Files
                            </button>
                        </div>
                    </div>

                    <!-- View Existing Documents -->
                    <div>
                        <h4 style="margin: 0 0 12px 0; font-size: 0.95rem; color: #374151;">Existing Documents</h4>
                        <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 8px;">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Document Name</th>
                                        <th>Document Type</th>
                                        <th>Uploaded Date/Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Income_Statement_${appId.replace('#', '')}.pdf</td>
                                        <td><span class="badge" style="background: #fef3c7; color: #92400e;">Income Statement</span></td>
                                        <td>Jan 30, 2026 02:50 PM</td>
                                        <td><button class="icon-btn" onclick="alert('Opening document viewer')"><i class="ph ph-eye"></i></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Agent Response Section -->
                <div class="card" style="margin-bottom: 24px;">
                    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 16px;">
                        <h3 style="margin: 0; font-size: 1.1rem;">Agent Response</h3>
                    </div>
                    <div>
                        <label style="color: #64748b; font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">My Remark / Agent Remark</label>
                        <textarea style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 0.95rem; min-height: 120px; resize: vertical;" placeholder="Provide your response to the bank\'s remarks. Explain the clarifications or additional information you are providing..."></textarea>
                        <p style="color: #9ca3af; font-size: 0.8rem; margin-top: 8px;">Maximum 500 characters</p>
                    </div>
                </div>

                <!-- Resubmission Section -->
                <div class="card" style="margin-bottom: 24px; padding: 20px; background: #f0fdf4; border-left: 4px solid #10b981;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <h4 style="margin: 0 0 4px 0; font-size: 0.95rem; font-weight: 600;">Ready to Resubmit?</h4>
                            <p style="margin: 0; color: #64748b; font-size: 0.85rem;">Once submitted, the bank will review your additional documents and remarks.</p>
                        </div>
                        <button class="btn btn-primary" style="padding: 10px 20px;" onclick="app.resubmitApplication('${appId}')">
                            <i class="ph ph-paper-plane"></i> Resubmit to Bank
                        </button>
                    </div>
                </div>

                <!-- Application Details Section -->
                <div style="margin-top: 40px; padding-top: 24px; border-top: 2px solid #f1f5f9;">
                    <h2 style="margin-bottom: 24px; font-size: 1.3rem;">Full Application Details</h2>

                    <!-- Customer Information -->
                    <div class="card" style="margin-bottom: 24px;">
                        <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 16px;">
                            <h3 style="margin: 0; font-size: 1.1rem;">Customer Information</h3>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Full Name</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.fullName}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Identification Number (NRIC/Passport)</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.nric}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Phone Number</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.phone}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Email Address</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.email}</p>
                            </div>
                            <div style="grid-column: 1 / -1;">
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Residential Address</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.residentialAddress}</p>
                            </div>
                            <div style="grid-column: 1 / -1;">
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Mailing Address</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.mailingAddress}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Employer</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.employer}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Monthly Salary</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.salary}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Occupation</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.occupation}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Loan/Financing Details -->
                    <div class="card">
                        <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 16px;">
                            <h3 style="margin: 0; font-size: 1.1rem;">Loan/Financing Details</h3>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Upload Reference Number</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${application.uploadRefNumber}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Application ID</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${appId}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Product</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.product}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Loan Amount Requested</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.amountRequested}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Tenure</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.tenure}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Interest/Profit Rate</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.interestRate}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Purpose of Financing</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.purpose}</p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Status</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;"><span class="badge badge-warning">${loan.status}</span></p>
                            </div>
                            <div>
                                <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Submission Date/Time</label>
                                <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.submissionDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            `;
        },
        
        applicationDetails: function (appId) {
            const application = app.state.applications.find(a => a.id === appId);
            if (!application) return '<div class="card">Application not found.</div>';

            const { customer, loan } = application;
            return `
                <div class="page-wrapper">
                <div style="margin-bottom: 24px;">
                    <button class="btn btn-secondary" onclick="app.navigate('tracking')" style="display: flex; align-items: center; gap: 8px;">
                        <i class="ph ph-arrow-left"></i> Back to Tracking
                    </button>
                </div>

                <!-- Customer Information -->
                <div class="card" style="margin-bottom: 24px;">
                    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 16px;">
                        <h3 style="margin: 0; font-size: 1.1rem;">Customer Information</h3>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Full Name</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.fullName}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Identification Number (NRIC/Passport)</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.nric}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Phone Number</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.phone}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Email Address</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.email}</p>
                        </div>
                        <div style="grid-column: 1 / -1;">
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Residential Address</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.residentialAddress}</p>
                        </div>
                        <div style="grid-column: 1 / -1;">
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Mailing Address</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.mailingAddress}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Employer</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.employer}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Monthly Salary</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.salary}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Occupation</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${customer.occupation}</p>
                        </div>
                    </div>
                </div>

                <!-- Loan/Financing Details -->
                <div class="card">
                    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 16px;">
                        <h3 style="margin: 0; font-size: 1.1rem;">Loan/Financing Details</h3>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Upload Reference Number</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${application.uploadRefNumber}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Application ID</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${appId}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Product</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.product}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Loan Amount Requested</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.amountRequested}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Loan Amount Approved</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.amountApproved || 'N/A'}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Tenure</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.tenure}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Interest/Profit Rate</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.interestRate}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Purpose of Financing</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.purpose}</p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Status</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;"><span class="badge badge-${loan.status === 'Approved' ? 'success' : loan.status === 'Rejected' ? 'error' : loan.status === 'Under Review' ? 'blue' : 'warning'}">${loan.status}</span></p>
                        </div>
                        <div>
                            <label style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Submission Date/Time</label>
                            <p style="margin: 8px 0 0 0; font-size: 1rem;">${loan.submissionDate || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <!-- Uploaded Documents Section -->
                <div class="card" style="margin-top: 24px;">
                    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 16px;">
                        <h3 style="margin: 0; font-size: 1.1rem;">Uploaded Documents</h3>
                    </div>
                    <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 8px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Document Name</th>
                                    <th>Document Type</th>
                                    <th>Uploaded Date/Time</th>
                                    <th>Uploaded By</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ID_Proof_${appId.replace('#', '')}.pdf</td>
                                    <td><span class="badge" style="background: #e0e7ff; color: #3730a3;">ID Proof</span></td>
                                    <td>Jan 30, 2026 02:45 PM</td>
                                    <td>USER-0342</td>
                                    <td><button class="icon-btn" title="View Document" onclick="alert('Opening document viewer for: ID_Proof_${appId.replace('#', '')}.pdf')"><i class="ph ph-eye"></i></button></td>
                                </tr>
                                <tr>
                                    <td>Income_Statement_${appId.replace('#', '')}.pdf</td>
                                    <td><span class="badge" style="background: #fef3c7; color: #92400e;">Income Statement</span></td>
                                    <td>Jan 30, 2026 02:50 PM</td>
                                    <td>USER-0342</td>
                                    <td><button class="icon-btn" title="View Document" onclick="alert('Opening document viewer for: Income_Statement_${appId.replace('#', '')}.pdf')"><i class="ph ph-eye"></i></button></td>
                                </tr>
                                <tr>
                                    <td>Collateral_Doc_${appId.replace('#', '')}.pdf</td>
                                    <td><span class="badge" style="background: #d1fae5; color: #065f46;">Collateral Doc</span></td>
                                    <td>Jan 30, 2026 03:15 PM</td>
                                    <td>USER-0342</td>
                                    <td><button class="icon-btn" title="View Document" onclick="alert('Opening document viewer for: Collateral_Doc_${appId.replace('#', '')}.pdf')"><i class="ph ph-eye"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            `;
        },

        query: function () {
            const queryApplications = app.state.applications.filter(app => app.loan.status === 'Additional Info Required');
            
            if (queryApplications.length === 0) {
                return `
                    <div class="page-wrapper">
                    <div class="card" style="padding: 40px; text-align: center;">
                        <i class="ph ph-check-circle" style="font-size: 48px; color: #10b981; margin-bottom: 16px;"></i>
                        <h3 style="margin: 16px 0; color: #064e3b;">All Applications Processed</h3>
                        <p style="color: #64748b; margin: 8px 0 0 0;">No applications currently require additional information from the bank.</p>
                    </div>
                    </div>
                `;
            }

            return `
                <div class="page-wrapper">
                <div class="flex justify-between items-center" style="margin-bottom: 24px;">
                    <h2>Application Query</h2>
                    <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Showing ${queryApplications.length} application(s) awaiting action</p>
                </div>

                <!-- Query Applications Table -->
                <div class="card" style="padding: 0; overflow: hidden;">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Upload Reference Number</th>
                                    <th>Application ID</th>
                                    <th>Customer Name</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Submission Date/Time</th>
                                    <th>Bank Remark</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${queryApplications.map(app => `
                                    <tr>
                                        <td style="font-weight: 500;">${app.uploadRefNumber}</td>
                                        <td style="font-weight: 500;">${app.id}</td>
                                        <td>${app.customer.fullName}</td>
                                        <td>${app.loan.product}</td>
                                        <td>RM ${app.loan.amountRequested.replace('RM ', '')}</td>
                                        <td><span class="badge badge-warning">Additional Info Required</span></td>
                                        <td>${app.loan.submissionDate}</td>
                                        <td style="color: #64748b; font-size: 0.9rem;">${app.bankRemark || '-'}</td>
                                        <td><button class="icon-btn" onclick="app.navigate('queryDetails', '${app.id}')"><i class="ph ph-caret-right"></i></button></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
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
                <div class="page-wrapper">
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
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-outline" onclick="alert('Downloading Bulk Upload Template (XLSX)...')">
                            <i class="ph ph-download-simple"></i> Download Template
                        </button>
                        <button class="btn btn-primary" onclick="app.startWizard()">
                            <i class="ph ph-upload-simple"></i> Start Bulk Upload
                        </button>
                    </div>
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
                                    <th>Upload Reference Number</th>
                                    <th>File Name</th>
                                    <th>No. of Applications</th>
                                    <th>Status</th>
                                    <th>Uploaded Date/Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${app.state.bulkUploads.map(upload => `
                                    <tr>
                                        <td style="font-weight: 500;">
                                            <a href="#" onclick="app.filterTrackingByUpload('${upload.uploadRefNumber}')" style="color: var(--primary-color); text-decoration: none; cursor: pointer;">
                                                ${upload.uploadRefNumber}
                                            </a>
                                        </td>
                                        <td style="font-weight: 500;">
                                            <i class="ph ${upload.fileName.endsWith('.xlsx') ? 'ph-file-xls' : 'ph-file-csv'}" style="margin-right:8px; color: #64748b;"></i>
                                            ${upload.fileName}
                                        </td>
                                        <td>${upload.noOfApplications}</td>
                                        <td>${app.getStatusBadge(upload.status)}</td>
                                        <td>${upload.uploadedDateTime}</td>
                                        <td>${app.getActionButtons(upload.status)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            `;
        },

        performance: function () {
            const metrics = app.calculateMetrics();
            
            // Create commission table rows using shared metrics
            const commissionTableRows = metrics.approvedApps.length > 0 ? metrics.approvedApps.map(app => {
                const product = app.loan.product;
                const amountStr = app.loan.amountApproved || app.loan.amountRequested;
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
                
                return `<tr><td style="font-weight: 500;">${app.uploadRefNumber}</td><td style="font-weight: 500;">${app.id}</td><td>${app.customer.fullName}</td><td>${app.loan.product}</td><td>RM ${commission.toLocaleString('en-MY', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td><td style="text-align: center;"><span class="badge badge-success">Paid</span></td></tr>`;
            }).join('') : '<tr><td colspan="6" style="text-align: center; color: #64748b; padding: 24px;">No commission data available</td></tr>';
            
            // Create conversion funnel HTML using metrics
            const conversionFunnelHtml = [
                { label: 'Uploaded', count: app.state.applications.length, color: '#e0e7ff' },
                { label: 'Submitted', count: metrics.totalSubmitted, color: '#e0f2fe' },
                { label: 'Approved', count: metrics.approved, color: '#d1fae5' },
                { label: 'Funded', count: metrics.approved, color: '#fef3c7' }
            ].map((step, i) => {
                const percentage = i === 0 ? 100 : (step.count / app.state.applications.length * 100).toFixed(0);
                return `<div><div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span style="font-weight: 500; font-size: 0.9rem;">${step.label}</span><span style="color: #64748b; font-size: 0.85rem;">${step.count} (${percentage}%)</span></div><div style="height: 24px; background: #e2e8f0; border-radius: 4px; overflow: hidden;"><div style="height: 100%; width: ${percentage}%; background: ${step.color}; transition: all 0.3s;"></div></div></div>`;
            }).join('');
            
            // Create top products HTML using metrics
            const productCounts = {};
            app.state.applications.forEach(a => {
                if (!productCounts[a.loan.product]) {
                    productCounts[a.loan.product] = 0;
                }
                productCounts[a.loan.product]++;
            });
            
            const topProductsHtml = Object.entries(productCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([product, count]) => {
                    const maxCount = Math.max(...Object.values(productCounts));
                    const percentage = (count / maxCount * 100).toFixed(0);
                    return `<div><div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span style="font-weight: 500; font-size: 0.9rem;">${product}</span><span style="color: #64748b; font-size: 0.85rem;">${count} applications</span></div><div style="height: 20px; background: #e2e8f0; border-radius: 4px; overflow: hidden;"><div style="height: 100%; width: ${percentage}%; background: #8b5cf6; transition: all 0.3s;"></div></div></div>`;
                }).join('');
            
            // Create commission by product HTML using metrics
            const commissionByProductHtml = Object.entries(metrics.commissionByProduct)
                .sort(([,a], [,b]) => b.commission - a.commission)
                .map(([product, data]) => `<div style="padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;"><div style="color: #64748b; font-size: 0.85rem; margin-bottom: 8px;">${product}</div><div style="font-size: 1.5rem; font-weight: 700; color: #10b981;">RM ${data.commission.toFixed(2)}</div></div>`)
                .join('');
            
            return `
                <div class="page-wrapper">
                <div class="flex justify-between items-center" style="margin-bottom: 24px;">
                    <h2>Performance & Commission</h2>
                </div>
                <div class="kpi-grid">
                    <div class="card kpi-card">
                        <span class="kpi-label">Total Submitted</span>
                        <span class="kpi-value">${metrics.totalSubmitted}</span>
                        <span class="kpi-trend trend-up"><i class="ph ph-trending-up"></i> ${metrics.totalSubmitted > 0 ? '+5' : '0'} This Month</span>
                    </div>
                    <div class="card kpi-card">
                        <span class="kpi-label">Approved</span>
                        <span class="kpi-value text-success">${metrics.approved}</span>
                        <span class="kpi-trend trend-up"><i class="ph ph-check-circle"></i> ${metrics.approvalRate}% Rate</span>
                    </div>
                    <div class="card kpi-card">
                        <span class="kpi-label">Total Processing</span>
                        <span class="kpi-value" style="color: var(--warning-color)">${metrics.pending + metrics.additionalInfo}</span>
                        <span class="kpi-trend"><i class="ph ph-clock"></i> In Progress</span>
                    </div>
                    <div class="card kpi-card">
                        <span class="kpi-label">Rejected</span>
                        <span class="kpi-value" style="color: var(--danger-color)">${metrics.rejected}</span>
                        <span class="kpi-trend trend-down"><i class="ph ph-x-circle"></i> ${metrics.rejectionRate}%</span>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin: 24px 0;">
                    <div class="card" style="border-left: 4px solid #10b981;">
                        <div style="color: #64748b; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">Estimated Commission (MTD)</div>
                        <div style="font-size: 2rem; font-weight: 700; color: #10b981; margin-bottom: 8px;">RM ${metrics.totalMTDCommission.toFixed(2)}</div>
                        <div style="font-size: 0.85rem; color: #64748b;">From ${metrics.approvedApps.length} approved application(s)</div>
                    </div>
                    <div class="card" style="border-left: 4px solid #0284c7;">
                        <div style="color: #64748b; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">Estimated Commission (YTD)</div>
                        <div style="font-size: 2rem; font-weight: 700; color: #0284c7; margin-bottom: 8px;">RM ${metrics.totalYTDCommission.toFixed(2)}</div>
                        <div style="font-size: 0.85rem; color: #64748b;">Year-to-date projection</div>
                    </div>
                    <div class="card" style="border-left: 4px solid #7c3aed;">
                        <div style="color: #64748b; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">Approval Rate</div>
                        <div style="font-size: 2rem; font-weight: 700; color: #7c3aed; margin-bottom: 8px;">${metrics.approvalRate}%</div>
                        <div style="font-size: 0.85rem; color: #64748b;">${metrics.approved} of ${metrics.totalSubmitted} applications</div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0;">
                    <div class="card">
                        <h3 style="margin: 0 0 20px 0; font-size: 1.1rem;">Conversion Funnel</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${conversionFunnelHtml}
                        </div>
                    </div>
                    <div class="card">
                        <h3 style="margin: 0 0 20px 0; font-size: 1.1rem;">Top Products Sold</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${topProductsHtml}
                        </div>
                    </div>
                </div>
                
                <div class="card" style="margin: 24px 0;">
                    <h3 style="margin: 0 0 20px 0; font-size: 1.1rem;">Commission Breakdown by Product</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                        ${commissionByProductHtml}
                    </div>
                </div>
                
                <div class="card" style="padding: 0; overflow: hidden; margin: 24px 0;">
                    <div style="padding: 16px 24px; border-bottom: 1px solid #f1f5f9;">
                        <h3 style="margin: 0; font-size: 1rem;">Commission Details (Approved Applications)</h3>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Upload Reference</th>
                                    <th>Application ID</th>
                                    <th>Customer Name</th>
                                    <th>Product</th>
                                    <th>Loan Amount</th>
                                    <th>Commission Rate (%)</th>
                                    <th>Estimated Commission (RM)</th>
                                    <th>Approval Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${commissionTableRows}
                            </tbody>
                        </table>
                    </div>
                    <div style="padding: 16px 24px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
                        <div style="color: #64748b; font-size: 0.9rem;">
                            <strong>Total Commission (Approved)</strong>: RM ${metrics.totalMTDCommission.toFixed(2)}
                        </div>
                        <button class="btn btn-outline" onclick="alert('Export functionality coming soon: PDF or Excel report of your commission details.')">
                            <i class="ph ph-download-simple"></i> Export Report
                        </button>
                    </div>
                </div>
                </div>
            `;
        }
    },

    getStatusBadge: function (status) {
        let badgeClass = 'badge-success';
        let bgColor = '#d1fae5';
        let textColor = '#065f46';

        if (status === 'Pending Documents Upload') {
            badgeClass = 'badge-warning';
            bgColor = '#fef3c7';
            textColor = '#92400e';
        } else if (status === 'Pending Submission to Bank') {
            badgeClass = 'badge-blue';
            bgColor = '#dbeafe';
            textColor = '#1e40af';
        } else if (status === 'Submitted to Bank') {
            badgeClass = 'badge-success';
            bgColor = '#d1fae5';
            textColor = '#065f46';
        } else if (status === 'Cancelled') {
            badgeClass = 'badge-error';
            bgColor = '#fee2e2';
            textColor = '#991b1b';
        }

        return `<span class="badge" style="background: ${bgColor}; color: ${textColor};">${status}</span>`;
    },

    // Helper: Get Action Buttons Based on Status
    getActionButtons: function (status) {
        let uploadDisabled = '';
        let submitDisabled = '';
        let cancelDisabled = '';
        let submitClass = 'btn btn-outline';
        let uploadStyle = 'padding: 6px 12px; font-size: 0.85rem;';
        let submitStyle = 'padding: 6px 12px; font-size: 0.85rem;';
        let cancelStyle = 'padding: 6px 12px; font-size: 0.85rem; color: #ef4444; border-color: #ef4444;';
        
        // Determine which buttons should be disabled based on status
        if (status === 'Pending Documents Upload') {
            // Upload Doc and Cancel are enabled, Submit is disabled
            submitDisabled = 'disabled';
            submitStyle = 'padding: 6px 12px; font-size: 0.85rem; opacity: 0.4; cursor: not-allowed; background: #f8fafc; color: #94a3b8; border-color: #e2e8f0;';
        } else if (status === 'Pending Submission to Bank') {
            // All buttons are enabled, Submit becomes primary
            submitClass = 'btn btn-primary';
        } else if (status === 'Submitted to Bank' || status === 'Cancelled') {
            // All buttons are disabled
            uploadDisabled = 'disabled';
            submitDisabled = 'disabled';
            cancelDisabled = 'disabled';
            uploadStyle = 'padding: 6px 12px; font-size: 0.85rem; opacity: 0.4; cursor: not-allowed; background: #f8fafc; color: #94a3b8; border-color: #e2e8f0;';
            submitStyle = 'padding: 6px 12px; font-size: 0.85rem; opacity: 0.4; cursor: not-allowed; background: #f8fafc; color: #94a3b8; border-color: #e2e8f0;';
            cancelStyle = 'padding: 6px 12px; font-size: 0.85rem; opacity: 0.4; cursor: not-allowed; background: #f8fafc; color: #94a3b8; border-color: #e2e8f0;';
        }

        return `
            <div style="display: flex; gap: 8px;">
                <button class="btn btn-outline" style="${uploadStyle}" onclick="app.uploadDoc('${status}')" ${uploadDisabled}>
                    <i class="ph ph-paperclip"></i> Upload Doc
                </button>
                <button class="${submitClass}" style="${submitStyle}" onclick="app.submitToBank()" ${submitDisabled}>
                    <i class="ph ph-paper-plane"></i> Submit
                </button>
                <button class="btn btn-outline" style="${cancelStyle}" onclick="app.cancelUpload()" ${cancelDisabled}>
                    <i class="ph ph-x"></i> Cancel
                </button>
            </div>
        `;
    },

    // Helper: Filter Tracking by Upload Reference Number
    filterTrackingByUpload: function (uploadRefNumber) {
        this.state.filterByUploadRef = uploadRefNumber;
        this.navigate('tracking');
    },

    // Helper: Upload Doc Action
    uploadDoc: function (status) {
        alert(`Opening document upload for: ${status} batch`);
    },

    // Helper: Submit to Bank Action
    submitToBank: function () {
        alert('Submitting batch to bank...');
    },

    // Helper: Cancel Upload Action
    cancelUpload: function () {
        if (confirm('Are you sure you want to cancel this upload? This action cannot be undone.')) {
            alert('Upload cancelled successfully.');
            location.reload();
        }
    },

    // Helper: Clear Upload Filter
    clearUploadFilter: function () {
        this.state.filterByUploadRef = null;
        this.navigate('tracking');
    },

    resubmitApplication: function (appId) {
        // Find the application and update its status
        const application = this.state.applications.find(a => a.id === appId);
        if (application) {
            application.loan.status = 'Submitted to Bank';
            // Remove bank remark/description since it's no longer in "Additional Info Required" status
            delete application.bankRemark;
            delete application.bankDescription;
            
            // Show success message and navigate back to query
            alert('Application successfully resubmitted to the bank with your remarks and documents.\n\nStatus updated to: Submitted to Bank\n\nThe application will be removed from your query list.');
            this.navigate('query');
        }
    },

    toggleMessagesDropdown: function (event) {
        event.preventDefault();
        event.stopPropagation();
        const dropdown = document.getElementById('messages-dropdown');
        if (dropdown) {
            if (dropdown.style.display === 'none') {
                this.renderMessagesDropdown();
                dropdown.style.display = 'block';
                document.addEventListener('click', this.closeMessagesDropdown);
            } else {
                dropdown.style.display = 'none';
                document.removeEventListener('click', this.closeMessagesDropdown);
            }
        }
    },

    closeMessagesDropdown: function () {
        const dropdown = document.getElementById('messages-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    },

    renderMessagesDropdown: function () {
        const unreadMessages = this.state.messages.filter(m => !m.read);
        const messagesList = document.getElementById('messages-list');
        const unreadCount = document.getElementById('unread-count');
        
        if (messagesList) {
            messagesList.innerHTML = app.state.messages.length > 0 ? app.state.messages.map(msg => `
                <div style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer; background: ${msg.read ? '#ffffff' : '#f0f9ff'}; transition: background 0.2s; display: flex; gap: 8px;" onmouseover="this.style.background='${msg.read ? '#f8fafc' : '#e0f2fe'}'" onmouseout="this.style.background='${msg.read ? '#ffffff' : '#f0f9ff'}'">
                    <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; background: ${msg.read ? '#e2e8f0' : '#dbeafe'}; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.85rem; color: ${msg.read ? '#64748b' : '#1e40af'};">
                        ${msg.from.charAt(0)}
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: ${msg.read ? '500' : '700'}; color: var(--text-main); font-size: 0.85rem; margin-bottom: 2px;">${msg.from}</div>
                        <div style="color: #64748b; font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px;">${msg.subject}</div>
                        <div style="color: #94a3b8; font-size: 0.75rem;">${msg.timestamp}</div>
                    </div>
                    ${!msg.read ? '<div style="flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; background: #3b82f6; margin-top: 4px;"></div>' : ''}
                </div>
            `).join('') : `<div style="padding: 32px 16px; text-align: center; color: #64748b; font-size: 0.9rem;"><i class="ph ph-inbox" style="font-size: 32px; color: #cbd5e1; display: block; margin-bottom: 8px;"></i>No messages</div>`;
        }
        
        if (unreadCount) {
            unreadCount.textContent = unreadMessages.length;
        }
    },

    // Wizard Logic (Bulk Upload)
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
            <div class="page-wrapper">
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
            </div>
        `;
    }
};

// Initialize the app and bind events
function initializeApp() {
    // Initialize app
    app.init();
    
    // Bind event listeners for static elements
    const signInBtn = document.getElementById('sign-in-btn');
    if (signInBtn) {
        signInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            app.login();
        });
    }
    
    const forgotBtn = document.getElementById('forgot-password-link');
    if (forgotBtn) {
        forgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset link sent to your email.');
        });
    }
    
    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', () => app.logout());
    }
    
    // MFA event listeners
    const verifyPinBtn = document.getElementById('verify-pin-btn');
    if (verifyPinBtn) {
        verifyPinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            app.verifyMfaPin();
        });
    }
    
    const resendCodeBtn = document.getElementById('resend-code');
    if (resendCodeBtn) {
        resendCodeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            app.resendMfaCode();
        });
    }
    
    const backToLoginBtn = document.getElementById('back-to-login-btn');
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            app.backToLogin();
        });
    }
    
    // MFA PIN input - allow Enter key to verify
    const mfaPinInput = document.getElementById('mfa-pin');
    if (mfaPinInput) {
        mfaPinInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                app.verifyMfaPin();
            }
        });
        
        // Only allow numbers
        mfaPinInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Notification dropdown event listeners
    const notificationsBtn = document.getElementById('notifications-btn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', (e) => {
            app.toggleNotificationsDropdown(e);
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('notifications-dropdown');
        const btn = document.getElementById('notifications-btn');
        
        if (dropdown && btn && !dropdown.contains(e.target) && !btn.contains(e.target)) {
            app.closeNotificationsDropdown();
        }
    });
    
    // Mark all as read button
    document.addEventListener('click', (e) => {
        if (e.target.textContent === 'Mark All as Read') {
            e.preventDefault();
            app.markAllNotificationsRead();
        }
        
        if (e.target.textContent === 'View All') {
            e.preventDefault();
            alert('View All Notifications functionality would open a dedicated notifications page');
        }
    });
    
    // Bind navigation links in sidebar
    document.querySelectorAll('[data-navigate]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            app.navigate(link.getAttribute('data-navigate'));
        });
    });
    
    // Event delegation for dynamically generated content
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        
        const action = target.getAttribute('data-action');
        const param = target.getAttribute('data-param');
        
        switch(action) {
            case 'navigate':
                e.preventDefault();
                const viewId = target.getAttribute('data-view');
                const appId = target.getAttribute('data-app-id');
                app.navigate(viewId, appId);
                break;
            case 'logout':
                e.preventDefault();
                app.logout();
                break;
            case 'startWizard':
                app.startWizard();
                break;
            case 'nextStep':
                app.nextStep();
                break;
            case 'prevStep':
                app.prevStep();
                break;
            case 'filterByUpload':
                app.filterTrackingByUpload(param);
                break;
            case 'clearFilter':
                app.clearUploadFilter();
                break;
        }
    });
    
    console.log('Event listeners initialized');
}

// Check if DOM is already loaded (for deferred scripts)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded, initialize immediately
    initializeApp();
}
