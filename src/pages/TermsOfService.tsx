import { ScrollArea } from "@/components/ui/scroll-area";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">
              Terms of Service
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Please read these terms carefully before using our services
            </p>
            <p className="text-sm text-primary-foreground/70">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-elegant space-y-8">
            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-foreground/80 leading-relaxed">
                  By accessing and using AgriPal's website and services, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this 
                  service. These Terms of Service apply to all users of the site, including without limitation users 
                  who are browsers, vendors, customers, merchants, and/or contributors of content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  Permission is granted to temporarily access the materials (information or software) on AgriPal's 
                  website for personal, non-commercial transitory viewing only. This is the grant of a license, not 
                  a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on AgriPal's website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
                <p className="text-foreground/80 leading-relaxed mt-3">
                  This license shall automatically terminate if you violate any of these restrictions and may be 
                  terminated by AgriPal at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Services Description</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  AgriPal provides agricultural services including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Agricultural consultation and advisory services</li>
                  <li>Training and education programs</li>
                  <li>Project setup and management</li>
                  <li>Access to agricultural resources and library</li>
                  <li>Online courses and educational content</li>
                  <li>Agricultural insights and blog content</li>
                </ul>
                <p className="text-foreground/80 leading-relaxed mt-3">
                  We reserve the right to modify, suspend or discontinue any service at any time without notice or liability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. User Accounts</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                  Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
                <p className="text-foreground/80 leading-relaxed">
                  The Service and its original content (excluding content provided by users), features and functionality 
                  are and will remain the exclusive property of AgriPal and its licensors. The Service is protected by 
                  copyright, trademark, and other laws of both Zimbabwe and foreign countries. Our trademarks and trade 
                  dress may not be used in connection with any product or service without the prior written consent of AgriPal.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. User Content</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  Our Service may allow you to post, link, store, share and otherwise make available certain information, 
                  text, graphics, videos, or other material. You are responsible for the content that you post on or through 
                  the Service, including its legality, reliability, and appropriateness.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  By posting content on or through the Service, you grant us the right and license to use, modify, publicly 
                  perform, publicly display, reproduce, and distribute such content on and through the Service.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  You retain any and all of your rights to any content you submit, post or display on or through the Service 
                  and you are responsible for protecting those rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Prohibited Uses</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>In any way that violates any applicable national or international law or regulation</li>
                  <li>To exploit, harm, or attempt to exploit or harm minors in any way</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                  <li>To impersonate or attempt to impersonate AgriPal, an AgriPal employee, another user, or any other person or entity</li>
                  <li>In any way that infringes upon the rights of others</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Payment Terms</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  If you wish to purchase any service made available through the Service, you may be asked to supply 
                  certain information relevant to your purchase including, without limitation, your credit card number, 
                  the expiration date of your credit card, your billing address, and your shipping information.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: 
                  service availability, errors in the description or price of the service, error in your order or other reasons.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  All fees are in United States Dollars (USD) or local currency as specified, and are non-refundable unless 
                  otherwise stated.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
                <p className="text-foreground/80 leading-relaxed">
                  In no event shall AgriPal, nor its directors, employees, partners, agents, suppliers, or affiliates, be 
                  liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
                  loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
                  inability to access or use the Service; any conduct or content of any third party on the Service; any content 
                  obtained from the Service; and unauthorized access, use or alteration of your transmissions or content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Disclaimer</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. 
                  The Service is provided without warranties of any kind, whether express or implied, including, but not limited 
                  to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance. 
                  AgriPal, its subsidiaries, affiliates, and its licensors do not warrant that the Service will function uninterrupted, 
                  secure or available at any particular time or location.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Governing Law</h2>
                <p className="text-foreground/80 leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of Zimbabwe, without regard to its 
                  conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered 
                  a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, 
                  the remaining provisions of these Terms will remain in effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to Terms</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
                  material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes 
                  a material change will be determined at our sole discretion. By continuing to access or use our Service after 
                  those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Us</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-foreground/80"><strong>Email:</strong> info@agripal.co.zw</p>
                  <p className="text-foreground/80"><strong>Phone:</strong> +263 771 043 062</p>
                  <p className="text-foreground/80"><strong>Address:</strong> Wessex Road, Malbereign, Harare, Zimbabwe</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
