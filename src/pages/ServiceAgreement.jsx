import { useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import './ServiceAgreement.css'

export default function ServiceAgreement() {
  const wrapRef = useRef(null)

  useEffect(() => {
    document.title = 'Service Agreement — Hiro Labs × NeXus RV'
  }, [])

  const handleDownloadPDF = async () => {
    const el = wrapRef.current
    const canvas = await html2canvas(el, { backgroundColor: '#0d1117', scale: 2, useCORS: true })
    const imgData = canvas.toDataURL('image/jpeg', 0.92)
    const pxW = canvas.width
    const pxH = canvas.height
    const pdfW = 210
    const pdfH = (pxH * pdfW) / pxW
    const pdf = new jsPDF({ unit: 'mm', format: [pdfW, pdfH], compress: true })
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH)
    pdf.save('Hiro-Labs_NeXus-RV_Service-Agreement.pdf')
  }

  return (
    <div className="sa">
      <div className="sa-wrap" ref={wrapRef}>

        {/* Header */}
        <div className="sa-header">
          <div>
            <h1>hiro labs</h1>
            <div className="sa-header-tagline">Website Management Service Agreement</div>
          </div>
          <div className="sa-header-right">
            May 2026<br />
            hiro-labs.dev<br />
            Tampa, FL<br />
            <button className="sa-pdf-btn" onClick={handleDownloadPDF}>↓ Download PDF</button>
          </div>
        </div>

        {/* Meta bar */}
        <div className="sa-meta-bar">
          <div className="sa-meta-block">
            <h3>Provider</h3>
            <p>Hiro Labs</p>
          </div>
          <div className="sa-meta-block">
            <h3>Client</h3>
            <p>NeXus RV</p>
          </div>
          <div className="sa-meta-block">
            <h3>Term</h3>
            <p>12 months</p>
          </div>
          <div className="sa-meta-block">
            <h3>Monthly Retainer</h3>
            <p>$1,000.00</p>
          </div>
        </div>

        {/* Content */}
        <div className="sa-content">

          <Section title="1. Services">
            <p>Provider shall deliver the following services for Client's web platform (nexusrv.com and associated systems):</p>

            <SubSection title="1.1 Maintenance Services (Included in Retainer)">
              <ul>
                <li>Security patches and dependency updates (frontend and backend)</li>
                <li>Bug monitoring, identification, and resolution</li>
                <li>Uptime monitoring via Provider's monitoring tools (Jinkies)</li>
                <li>CMS support and guidance for content updates via Django Admin</li>
                <li>Database backup monitoring and verification</li>
                <li>SSL certificate renewal management</li>
                <li>DNS management assistance</li>
              </ul>
            </SubSection>

            <SubSection title="1.2 Hosting Management Assistance">
              <ul>
                <li>AWS infrastructure oversight (EC2, S3, CloudFront, RDS, SSM)</li>
                <li>CI/CD pipeline maintenance (GitHub Actions)</li>
                <li>Deployment support and troubleshooting</li>
                <li>Performance monitoring and basic optimization</li>
              </ul>
            </SubSection>

            <SubSection title="1.3 Development Hours">
              <ul>
                <li>Four (4) hours of development time included per month</li>
                <li>Development work includes: feature modifications, template changes, integration adjustments, and technical research</li>
                <li>Unused hours do not roll over to subsequent months</li>
              </ul>
            </SubSection>

            <SubSection title="1.4 Exclusions">
              <p>The following are not included in the monthly retainer and will be quoted separately:</p>
              <ul>
                <li>New feature development beyond included hours</li>
                <li>Third-party API migrations or major integration changes</li>
                <li>Platform migrations or re-architecture</li>
                <li>Data migrations</li>
                <li>Design/UX overhauls</li>
                <li>Content creation (copywriting, photography, graphic design)</li>
                <li>Training sessions beyond initial onboarding</li>
              </ul>
            </SubSection>
          </Section>

          <Section title="2. Compensation">
            <SubSection title="2.1 Monthly Retainer">
              <p>Client shall pay Provider <strong>$1,000.00 USD per month</strong>, due on the first business day of each month.</p>
            </SubSection>

            <SubSection title="2.2 Overage Rate">
              <p>Work exceeding the four (4) included development hours shall be billed at <strong>$125.00 USD per hour</strong>.</p>
            </SubSection>

            <SubSection title="2.3 Time Tracking">
              <ul>
                <li>Each task carries a <strong>one (1) hour minimum</strong></li>
                <li>Time beyond the first hour is billed in <strong>15-minute increments</strong></li>
                <li>General correspondence (emails, quick questions) is not billable</li>
                <li>Research, investigation, and technical analysis required to answer questions is billable</li>
                <li>Provider shall furnish a monthly summary of hours consumed upon request</li>
              </ul>
            </SubSection>

            <SubSection title="2.4 Payment Terms">
              <p>Invoices are due upon receipt. Payment is considered late after 15 calendar days. Provider reserves the right to suspend non-emergency services for accounts more than 30 days past due.</p>
            </SubSection>
          </Section>

          <Section title="3. Service Level Objectives">
            <SubSection title="3.1 Business Hours">
              <p>Monday through Friday, 10:00 AM – 6:00 PM Eastern Time, excluding federal holidays.</p>
            </SubSection>

            <SubSection title="3.2 Response Times">
              <p>Response is defined as acknowledgment and initial assessment of the issue, not resolution.</p>
              <table className="sa-table">
                <thead>
                  <tr>
                    <th>Severity</th>
                    <th>Definition</th>
                    <th>Response</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Critical</td>
                    <td>Site completely down, payment processing broken, data breach or security incident</td>
                    <td>2 hours</td>
                  </tr>
                  <tr>
                    <td>High</td>
                    <td>Major feature non-functional (forms not submitting, pages returning errors, admin inaccessible)</td>
                    <td>4 hours</td>
                  </tr>
                  <tr>
                    <td>Medium</td>
                    <td>Minor bugs, cosmetic issues, CMS questions, non-blocking errors</td>
                    <td>1 business day</td>
                  </tr>
                  <tr>
                    <td>Low</td>
                    <td>Feature requests, general questions, enhancement ideas</td>
                    <td>2 business days</td>
                  </tr>
                </tbody>
              </table>
            </SubSection>

            <SubSection title="3.3 After-Hours Emergencies">
              <p>Critical issues reported outside business hours will be addressed on a best-effort basis. Provider is not obligated to respond outside of defined business hours but will make reasonable efforts for Critical severity issues.</p>
            </SubSection>

            <SubSection title="3.4 Uptime">
              <p>Provider does not guarantee uptime of third-party services (AWS, Stripe, Postmark, etc.). Provider's responsibility is limited to timely response and remediation of issues within Provider's control.</p>
            </SubSection>
          </Section>

          <Section title="4. Client Responsibilities">
            <SubSection title="4.1 Third-Party Costs">
              <p>Client is responsible for all third-party service costs, including but not limited to:</p>
              <ul>
                <li>AWS hosting (EC2, S3, CloudFront, RDS, Route 53, data transfer)</li>
                <li>Stripe transaction and platform fees</li>
                <li>Postmark email service</li>
                <li>Mapbox (if/when activated)</li>
                <li>Domain registration and renewal</li>
                <li>Any future third-party services added to the platform</li>
              </ul>
            </SubSection>

            <SubSection title="4.2 Access">
              <p>Client shall maintain and provide Provider with necessary access to:</p>
              <ul>
                <li>AWS account (IAM access with appropriate permissions)</li>
                <li>GitHub repository</li>
                <li>Stripe dashboard (if required for store management)</li>
                <li>Domain registrar / DNS management</li>
                <li>Any other services required to perform maintenance duties</li>
              </ul>
            </SubSection>

            <SubSection title="4.3 Communication">
              <p>Client shall designate a primary point of contact for all service requests. Requests should be submitted via email or an agreed-upon channel.</p>
            </SubSection>
          </Section>

          <Section title="5. Intellectual Property">
            <SubSection title="5.1 Client Ownership">
              <p>All source code, content, data, designs, and other materials comprising the NeXus RV platform are and shall remain the exclusive property of Client.</p>
            </SubSection>

            <SubSection title="5.2 Provider Portfolio Rights">
              <p>Provider may reference Client's name and publicly-visible aspects of the platform (screenshots of public pages, general architecture descriptions, technology stack) in Provider's marketing materials and portfolio. Provider shall not disclose proprietary source code, business data, internal systems, or confidential information in any portfolio or demonstration context.</p>
            </SubSection>
          </Section>

          <Section title="6. Liability">
            <SubSection title="6.1 Limitation of Liability">
              <p>Provider's total aggregate liability under this Agreement shall not exceed the total fees paid by Client to Provider during the twelve (12) months preceding the claim.</p>
            </SubSection>

            <SubSection title="6.2 Exclusion of Consequential Damages">
              <p>In no event shall Provider be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of revenue, loss of customers, loss of data, or business interruption, regardless of the cause of action or theory of liability.</p>
            </SubSection>

            <SubSection title="6.3 Third-Party Services">
              <p>Provider shall not be liable for outages, data loss, or service degradation caused by third-party providers (AWS, Stripe, Postmark, GitHub, etc.).</p>
            </SubSection>
          </Section>

          <Section title="7. Term and Termination">
            <SubSection title="7.1 Term">
              <p>This Agreement shall remain in effect for twelve (12) months from the Effective Date and shall automatically renew on a month-to-month basis thereafter unless terminated by either party.</p>
            </SubSection>

            <SubSection title="7.2 Termination">
              <p>Either party may terminate this Agreement with thirty (30) days written notice. No early termination fee applies.</p>
            </SubSection>

            <SubSection title="7.3 Transition">
              <p>Upon termination, Provider shall:</p>
              <ul>
                <li>Transfer all credentials and access documentation to Client or Client's designated successor</li>
                <li>Provide a summary of current system state, pending issues, and maintenance notes</li>
                <li>Ensure all Client data and code repositories are accessible to Client</li>
                <li>Remove Provider's access credentials within 7 days of termination effective date</li>
              </ul>
            </SubSection>
          </Section>

          <Section title="8. Pre-Agreement Setup">
            <p>The following items shall be completed by Provider before the Effective Date at no additional charge:</p>
            <ul>
              <li>Automated database backups configured in AWS (RDS automated backups and/or scheduled pg_dump to S3)</li>
              <li>Jinkies uptime monitoring configured for nexusrv.com and critical endpoints</li>
              <li>AWS account access verified and documented</li>
              <li>GitHub repository access and CI/CD pipeline verified functional</li>
            </ul>
          </Section>

          <Section title="9. Confidentiality">
            <p>Both parties agree to maintain the confidentiality of proprietary information disclosed during the course of this Agreement. This includes but is not limited to: source code, business data, customer information, financial details, and system credentials.</p>
          </Section>

          <Section title="10. General Provisions">
            <SubSection title="10.1 Independent Contractor">
              <p>Provider is an independent contractor. Nothing in this Agreement creates an employment, partnership, or agency relationship.</p>
            </SubSection>

            <SubSection title="10.2 Amendments">
              <p>This Agreement may only be amended in writing signed by both parties.</p>
            </SubSection>

            <SubSection title="10.3 Governing Law">
              <p>This Agreement shall be governed by the laws of the State of Florida.</p>
            </SubSection>

            <SubSection title="10.4 Entire Agreement">
              <p>This Agreement constitutes the entire understanding between the parties and supersedes all prior discussions, agreements, or representations.</p>
            </SubSection>
          </Section>

          <hr className="sa-divider" />

          <h2 className="sa-section-title">Signatures</h2>
          <div className="sa-signatures">
            <div className="sa-sig-block">
              <p><strong>Hiro Labs (Provider)</strong></p>
              <p className="sa-sig-line">Name:</p>
              <p className="sa-sig-line">Signature:</p>
              <p className="sa-sig-line">Date:</p>
            </div>
            <div className="sa-sig-block">
              <p><strong>NeXus RV (Client)</strong></p>
              <p className="sa-sig-line">Name:</p>
              <p className="sa-sig-line">Title:</p>
              <p className="sa-sig-line">Signature:</p>
              <p className="sa-sig-line">Date:</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sa-footer">
          This document is confidential and intended solely for the parties named above.
        </div>

      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="sa-section">
      <h2 className="sa-section-title">{title}</h2>
      {children}
    </div>
  )
}

function SubSection({ title, children }) {
  return (
    <div className="sa-subsection">
      <h3>{title}</h3>
      {children}
    </div>
  )
}
