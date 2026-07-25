# Website Management Service Agreement

**Between:** Hiro Labs ("Provider")
**And:** NeXus RV ("Client")

**Effective Date:** _______________
**Term:** 12 months from Effective Date

---

## 1. Services

Provider shall deliver the following services for Client's web platform (nexusrv.com and associated systems):

### 1.1 Maintenance Services (Included in Retainer)

- Security patches and dependency updates (frontend and backend)
- Bug monitoring, identification, and resolution
- Uptime monitoring via Provider's monitoring tools (Jinkies)
- CMS support and guidance for content updates via Django Admin
- Database backup monitoring and verification
- SSL certificate renewal management
- DNS management assistance

### 1.2 Hosting Management Assistance

- AWS infrastructure oversight (EC2, S3, CloudFront, RDS, SSM)
- CI/CD pipeline maintenance (GitHub Actions)
- Deployment support and troubleshooting
- Performance monitoring and basic optimization

### 1.3 Development Hours

- Four (4) hours of development time included per month
- Development work includes: feature modifications, template changes, integration adjustments, and technical research
- Unused hours do not roll over to subsequent months

### 1.4 Exclusions

The following are not included in the monthly retainer and will be quoted separately:

- New feature development beyond included hours
- Third-party API migrations or major integration changes
- Platform migrations or re-architecture
- Data migrations
- Design/UX overhauls
- Content creation (copywriting, photography, graphic design)
- Training sessions beyond initial onboarding

---

## 2. Compensation

### 2.1 Monthly Retainer

Client shall pay Provider **$1,000.00 USD per month**, due on the first business day of each month.

### 2.2 Overage Rate

Work exceeding the four (4) included development hours shall be billed at **$125.00 USD per hour**.

### 2.3 Time Tracking

- Each task carries a **one (1) hour minimum**
- Time beyond the first hour is billed in **15-minute increments**
- General correspondence (emails, quick questions) is not billable
- Research, investigation, and technical analysis required to answer questions is billable
- Provider shall furnish a monthly summary of hours consumed upon request

### 2.4 Payment Terms

Invoices are due upon receipt. Payment is considered late after 15 calendar days. Provider reserves the right to suspend non-emergency services for accounts more than 30 days past due.

---

## 3. Service Level Objectives

### 3.1 Business Hours

Monday through Friday, 10:00 AM – 6:00 PM Eastern Time, excluding federal holidays.

### 3.2 Response Times

Response is defined as acknowledgment and initial assessment of the issue, not resolution.

| Severity | Definition | Response Time |
|----------|-----------|---------------|
| Critical | Site completely down, payment processing broken, data breach or security incident | 2 hours |
| High | Major feature non-functional (forms not submitting, pages returning errors, admin inaccessible) | 4 hours |
| Medium | Minor bugs, cosmetic issues, CMS questions, non-blocking errors | 1 business day |
| Low | Feature requests, general questions, enhancement ideas | 2 business days |

### 3.3 After-Hours Emergencies

Critical issues reported outside business hours will be addressed on a best-effort basis. Provider is not obligated to respond outside of defined business hours but will make reasonable efforts for Critical severity issues.

### 3.4 Uptime

Provider does not guarantee uptime of third-party services (AWS, Stripe, Postmark, etc.). Provider's responsibility is limited to timely response and remediation of issues within Provider's control.

---

## 4. Client Responsibilities

### 4.1 Third-Party Costs

Client is responsible for all third-party service costs, including but not limited to:

- AWS hosting (EC2, S3, CloudFront, RDS, Route 53, data transfer)
- Stripe transaction and platform fees
- Postmark email service
- Mapbox (if/when activated)
- Domain registration and renewal
- Any future third-party services added to the platform

### 4.2 Access

Client shall maintain and provide Provider with necessary access to:

- AWS account (IAM access with appropriate permissions)
- GitHub repository
- Stripe dashboard (if required for store management)
- Domain registrar / DNS management
- Any other services required to perform maintenance duties

### 4.3 Communication

Client shall designate a primary point of contact for all service requests. Requests should be submitted via email or an agreed-upon channel.

---

## 5. Intellectual Property

### 5.1 Client Ownership

All source code, content, data, designs, and other materials comprising the NeXus RV platform are and shall remain the exclusive property of Client.

### 5.2 Provider Portfolio Rights

Provider may reference Client's name and publicly-visible aspects of the platform (screenshots of public pages, general architecture descriptions, technology stack) in Provider's marketing materials and portfolio. Provider shall not disclose proprietary source code, business data, internal systems, or confidential information in any portfolio or demonstration context.

---

## 6. Liability

### 6.1 Limitation of Liability

Provider's total aggregate liability under this Agreement shall not exceed the total fees paid by Client to Provider during the twelve (12) months preceding the claim.

### 6.2 Exclusion of Consequential Damages

In no event shall Provider be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of revenue, loss of customers, loss of data, or business interruption, regardless of the cause of action or theory of liability.

### 6.3 Third-Party Services

Provider shall not be liable for outages, data loss, or service degradation caused by third-party providers (AWS, Stripe, Postmark, GitHub, etc.).

---

## 7. Term and Termination

### 7.1 Term

This Agreement shall remain in effect for twelve (12) months from the Effective Date and shall automatically renew on a month-to-month basis thereafter unless terminated by either party.

### 7.2 Termination

Either party may terminate this Agreement with thirty (30) days written notice. No early termination fee applies.

### 7.3 Transition

Upon termination, Provider shall:

- Transfer all credentials and access documentation to Client or Client's designated successor
- Provide a summary of current system state, pending issues, and maintenance notes
- Ensure all Client data and code repositories are accessible to Client
- Remove Provider's access credentials within 7 days of termination effective date

---

## 8. Pre-Agreement Setup

The following items shall be completed by Provider before the Effective Date at no additional charge:

- Automated database backups configured in AWS (RDS automated backups and/or scheduled pg_dump to S3)
- Jinkies uptime monitoring configured for nexusrv.com and critical endpoints
- AWS account access verified and documented
- GitHub repository access and CI/CD pipeline verified functional

---

## 9. Confidentiality

Both parties agree to maintain the confidentiality of proprietary information disclosed during the course of this Agreement. This includes but is not limited to: source code, business data, customer information, financial details, and system credentials.

---

## 10. General Provisions

### 10.1 Independent Contractor

Provider is an independent contractor. Nothing in this Agreement creates an employment, partnership, or agency relationship.

### 10.2 Amendments

This Agreement may only be amended in writing signed by both parties.

### 10.3 Governing Law

This Agreement shall be governed by the laws of the State of Florida.

### 10.4 Entire Agreement

This Agreement constitutes the entire understanding between the parties and supersedes all prior discussions, agreements, or representations.

---

## Signatures

**Hiro Labs (Provider)**

Name: ___________________________
Signature: ___________________________
Date: ___________________________

**NeXus RV (Client)**

Name: ___________________________
Title: ___________________________
Signature: ___________________________
Date: ___________________________
