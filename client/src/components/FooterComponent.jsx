import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsTwitterX,
  BsGithub,
  BsDribbble,
  BsInstagram,
} from "react-icons/bs";

import React from "react";

function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      {/* for full footer */}
      <div className="w-full max-w-7xl mx-auto">
        {/* For Logo and Consents */}
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          {/* Logo */}
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Ash's
              </span>{" "}
              Blog
            </Link>
          </div>
          {/* Consent */}
          <div className="grid grid-cols-3 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            {/* About */}
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://nodejs.org/en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Node
                </Footer.Link>
                <Footer.Link
                  href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwio05-isouJAxUuqmYCHYuyA8oYABAAGgJzbQ&co=1&ase=2&gclid=CjwKCAjw3624BhBAEiwAkxgTOs5r7hkpA7e1706AnNDZQGxFsZpPdQYQAUQWnJ9H0ABsHDybSAybwBoCmKcQAvD_BwE&ohost=www.google.com&cid=CAESV-D2pWn373NS7SCeZ-zZIzV5bh1zgECOI65os8pmpXUcNpaPUIKEsJorG1rGScsE-hu5weMmi-jNq-zEi4vO3Umy5yH1NvyTYhZCjMc2WA_16YhCDQh20g&sig=AOD64_3y68MDo0sjEv4wYSr68T0DP4t9Eg&q&nis=4&adurl&ved=2ahUKEwjPkpuisouJAxUJ2DgGHfc0OK8Q0Qx6BAgIEAE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Android Studio
                </Footer.Link>
                <Footer.Link
                  href="https://spring.io/projects/spring-boot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spring Boot
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            {/* Follow us */}
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://chatgpt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ChatGpt
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            {/* Leagal */}
            <div>
              <Footer.Title title="Leagal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms & Condition
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Decapx"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsTwitterX} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
            <Footer.Icon href="#" icon={BsInstagram} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComponent;
