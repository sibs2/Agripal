import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">
              Privacy Policy
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Your privacy is important to us
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
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Welcome to AgriPal. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit 
                  our website and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  We may collect, use, store and transfer different kinds of personal data about you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li><strong>Identity Data:</strong> First name, last name, username or similar identifier</li>
                  <li><strong>Contact Data:</strong> Email address, telephone numbers, and physical address</li>
                  <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting and location</li>
                  <li><strong>Usage Data:</strong> Information about how you use our website, products and services</li>
                  <li><strong>Marketing and Communications Data:</strong> Your preferences in receiving marketing from us and your communication preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>To register you as a new customer and provide our services</li>
                  <li>To process and deliver your orders and manage payments</li>
                  <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy</li>
                  <li>To improve our website, products/services, marketing or customer relationships</li>
                  <li>To send you newsletters and marketing communications (with your consent)</li>
                  <li>To respond to your inquiries and provide customer support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We have put in place appropriate security measures to prevent your personal data from being 
                  accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access 
                  to your personal data to those employees, agents, contractors and other third parties who have a 
                  business need to know. They will only process your personal data on our instructions and they are 
                  subject to a duty of confidentiality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Retention</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We will only retain your personal data for as long as necessary to fulfill the purposes we collected 
                  it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. 
                  To determine the appropriate retention period for personal data, we consider the amount, nature, and 
                  sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of 
                  your personal data, the purposes for which we process your personal data and whether we can achieve 
                  those purposes through other means.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Legal Rights</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li><strong>Request access</strong> to your personal data</li>
                  <li><strong>Request correction</strong> of your personal data</li>
                  <li><strong>Request erasure</strong> of your personal data</li>
                  <li><strong>Object to processing</strong> of your personal data</li>
                  <li><strong>Request restriction</strong> of processing your personal data</li>
                  <li><strong>Request transfer</strong> of your personal data</li>
                  <li><strong>Right to withdraw consent</strong> at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Cookies</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Our website uses cookies to distinguish you from other users. This helps us to provide you with a 
                  good experience when you browse our website and also allows us to improve our site. A cookie is a 
                  small file of letters and numbers that we store on your browser or the hard drive of your computer 
                  if you agree. You can set your browser to refuse all or some browser cookies, or to alert you when 
                  websites set or access cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Third-Party Links</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Our website may include links to third-party websites, plug-ins and applications. Clicking on those 
                  links or enabling those connections may allow third parties to collect or share data about you. We do 
                  not control these third-party websites and are not responsible for their privacy statements. When you 
                  leave our website, we encourage you to read the privacy policy of every website you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Children's Privacy</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Our services are not directed to children under the age of 13, and we do not knowingly collect 
                  personal information from children under 13. If we learn that we have collected personal information 
                  from a child under age 13, we will delete that information as quickly as possible.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We may update our privacy policy from time to time. We will notify you of any changes by posting the 
                  new privacy policy on this page and updating the "Last updated" date at the top of this privacy policy. 
                  You are advised to review this privacy policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  If you have any questions about this privacy policy or our privacy practices, please contact us:
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

export default PrivacyPolicy;
