import { Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Services Section */}
          <div className="text-left">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>Hand Holding</li>
              <li>Land Monitoring</li>
              <li>Thorough Legal Verification</li>
              <li>Get Your Land Surveyed</li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="text-left">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="text-left">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <p className="text-gray-600 mt-2">+91 8341149011</p>
            <p className="text-gray-600">email: support@1acre.in</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              <Instagram className="w-6 h-6 cursor-pointer" />
              <Youtube className="w-6 h-6 cursor-pointer" />
              <Linkedin className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-yellow-400 text-center py-3 text-black font-medium">
        © 2025 - 1acre.in - All Rights Reserved
      </div>
    </footer>
  );
}
