import React from 'react';
import "../common.css";
import "../commonsecond.css";



const Footer = () => {
  return (
    <section className="footer_area">
      <section className="bottom section-padding">
        <div className="container placeholder-container">
          <div className="row wpart">
            {/* Footer Logo Info */}
            <div className="col-xl-3 col-sm-6 col-md-6 widget_edit_enabled">
              {/* <div className="widget_controls_panel" data-widgetfilename="footer_logo_info">
                <a href="#" className="btn btn-move btn-down" data-diff="+1" data-widgetfilename="footer_logo_info">
                  <i className="fa fa-arrow-down"></i>
                </a>
                <a href="#" className="btn btn-move btn-up" data-diff="-1" data-widgetfilename="footer_logo_info">
                  <i className="fa fa-arrow-up"></i>
                </a>
                <a
                  href="https://townmanor.in/admin/templatefiles/edit/footer_logo_info.php/widgets"
                  target="_blank"
                  className="btn btn-edit"
                >
                  <i className="ion-edit"></i>
                </a>
                <a href="#" className="btn btn-remove" data-widgetfilename="footer_logo_info">
                  <i className="fa fa-trash"></i>
                </a>
              </div> */}
              <div className="bottom-logo">
                <img
                  width="220"
                  src="./footer-logo.png"
                  alt="Townmanor Technologies Pvt Ltd."
                  className="img-fluid"
                />
                <div className="content">
                  <p className="description">
                    Townmanor Technologies Pvt Ltd, a comprehensive proptech aggregator platform, has been officially
                    recognized as a Startup by StartupIndia, DIIPT, under the auspices of the Government of India.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Contact */}
            <div className="col-xl-3 col-sm-6 widget_edit_enabled">
              {/* <div className="widget_controls_panel" data-widgetfilename="footer_contact">
                <a href="#" className="btn btn-move btn-down" data-diff="+1" data-widgetfilename="footer_contact">
                  <i className="fa fa-arrow-down"></i>
                </a>
                <a href="#" className="btn btn-move btn-up" data-diff="-1" data-widgetfilename="footer_contact">
                  <i className="fa fa-arrow-up"></i>
                </a>
                <a
                  href="https://townmanor.in/admin/templatefiles/edit/footer_contact.php/widgets"
                  target="_blank"
                  className="btn btn-edit"
                >
                  <i className="ion-edit"></i>
                </a>
                <a href="#" className="btn btn-remove" data-widgetfilename="footer_contact">
                  <i className="fa fa-trash"></i>
                </a>
              </div> */}
              <div className="widget-footer-contacts">
                <h3>CONTACT US</h3>
                <ul className="footer-list">
                  <li>
                    <i className="la la-map-marker"></i>
                    <span className="value">ST-304, Eldeco Studio, Sector 93A, Noida India, PIN-201304</span>
                  </li>
                  <li>
                    <i className="la la-phone"></i>
                    <span className="value">
                      <a href="tel://9101204420450">+91-0120-4420450</a>
                    </span>
                  </li>
                  <li>
                    <i className="la la-mobile"></i>
                    <span className="value">
                      <a href="tel:+91 7042888903">7042888903</a>
                    </span>
                  </li>
                  <li>
                    <i className="la la-envelope"></i>
                    <span className="value">
                      <a href="mailto:corporate@townmanor.in">corporate@townmanor.in</a>
                    </span>
                  </li>
                  <li>
                    <i className="la la-chevron-circle-right"></i>
                    <span className="value">
                      <a href="https://townmanor.in/en/180/contact_us">CONTACT US</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-xl-2 col-sm-6 col-md-4 widget_edit_enabled">
              {/* <div className="widget_controls_panel" data-widgetfilename="footer_social">
                <a href="#" className="btn btn-move btn-down" data-diff="+1" data-widgetfilename="footer_social">
                  <i className="fa fa-arrow-down"></i>
                </a>
                <a href="#" className="btn btn-move btn-up" data-diff="-1" data-widgetfilename="footer_social">
                  <i className="fa fa-arrow-up"></i>
                </a>
                <a
                  href="https://townmanor.in/admin/templatefiles/edit/footer_social.php/widgets"
                  target="_blank"
                  className="btn btn-edit"
                >
                  <i className="ion-edit"></i>
                </a>
                <a href="#" className="btn btn-remove" data-widgetfilename="footer_social">
                  <i className="fa fa-trash"></i>
                </a>
              </div> */}
              <div className="widget-footer-contacts">
                <h3>Quick Links</h3>
                <ul className="footer-list pl0">
                  <li>
                    <a href="https://townmanor.in/en/182/about_us">About Us</a>
                  </li>
                  <li>
                    <a href="https://townmanor.in/en/180/contact_us">Contact Us</a>
                  </li>
                  <li>
                    <a href="https://townmanor.in/en/183/faqs">FAQ's</a>
                  </li>
                  <li>
                    <a href="https://townmanor.in/en/195/terms_and_condition">Terms and condition</a>
                  </li>
                  <li>
                    <a href="https://townmanor.in/en/181/privacy_policy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="https://townmanor.in/en/198/refund_and_cancellation_policy">Refund and Cancellation Policy</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Services */}
            <div className="col-xl-2 col-sm-6 col-md-4 widget_edit_enabled">
              {/* <div className="widget_controls_panel" data-widgetfilename="footer_social">
                <a href="#" className="btn btn-move btn-down" data-diff="+1" data-widgetfilename="footer_social">
                  <i className="fa fa-arrow-down"></i>
                </a>
                <a href="#" className="btn btn-move btn-up" data-diff="-1" data-widgetfilename="footer_social">
                  <i className="fa fa-arrow-up"></i>
                </a>
                <a
                  href="https://townmanor.in/admin/templatefiles/edit/footer_social.php/widgets"
                  target="_blank"
                  className="btn btn-edit"
                >
                  <i className="ion-edit"></i>
                </a>
                <a href="#" className="btn btn-remove" data-widgetfilename="footer_social">
                  <i className="fa fa-trash"></i>
                </a>
              </div> */}
              <div className="widget-footer-contacts">
                <h3>Services</h3>
                <ul className="footer-list pl0">
                  <li>
                    <a href="https://townmanor.in/en/190/home_loan">Home Loan</a>
                  </li>
                  <li>
                    <a href="https://townmanor.in/en/191/insurance">Insurance</a>
                  </li>
                  <li>
                    <a href="https://townmanor.in/en/193/home_interior">Home Interior</a>
                  </li>
                  <li>
                    <a href="https://townmanor.in/en/197/subscription_plan">Subscription Plan</a>
                  </li>
                  <li>
                    <a href="#">Home Shift</a>
                  </li>
                  <li>
                    <a href="#">Property Valuation</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* More About */}
            <div className="col-xl-2 col-sm-6 col-md-4 widget_edit_enabled">
              {/* <div className="widget_controls_panel" data-widgetfilename="footer_social">
                <a href="#" className="btn btn-move btn-down" data-diff="+1" data-widgetfilename="footer_social">
                  <i className="fa fa-arrow-down"></i>
                </a>
                <a href="#" className="btn btn-move btn-up" data-diff="-1" data-widgetfilename="footer_social">
                  <i className="fa fa-arrow-up"></i>
                </a>
                <a
                  href="https://townmanor.in/admin/templatefiles/edit/footer_social.php/widgets"
                  target="_blank"
                  className="btn btn-edit"
                >
                  <i className="ion-edit"></i>
                </a>
                <a href="#" className="btn btn-remove" data-widgetfilename="footer_social">
                  <i className="fa fa-trash"></i>
                </a>
              </div> */}
              <div className="widget-footer-contacts">
                <h3>More About</h3>
                <ul className="footer-list pl0">
                  <li>
                    <a target="_blank" href="https://townmanor.in/blogs">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="#">News/Article</a>
                  </li>
                  <li>
                    <a href="#">Luxury Apartment</a>
                  </li>
                  <li>
                    <a href="#">Video Tutorial</a>
                  </li>
                  <li>
                    <a href="#">Support Team</a>
                  </li>
                  <li>
                    <a href="https://townmanor.in/sitemap.xml">Site Map</a>
                  </li>
                  <li>
                    <a href="#">Testimonials</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Follow Us */}
            <div className="col-xl-3 col-md-4">
              <div className="bottom-list widget-follow-us">
                <h3>Follow Us</h3>
                <div className="footer-social">
                  <a
                    href="https://www.facebook.com/share.php?u=https://townmanor.in/"
                    onClick={() => window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')}
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a
                    href="https://twitter.com/home?status=https://townmanor.in/"
                    onClick={() => window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')}
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/townmanor/"
                    onClick={() => window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')}
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a
                    href="https://www.instagram.com"
                    onClick={() => window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')}
                  >
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Properties in India */}
            <div className="col-xl-5 col-md-4">
              <div className="bottom-list widget-follow-us">
                <div className="property-footer-div-area d-flex align-items-center">
                  <h3 style={{ paddingLeft: '0px' }}>Properties in India</h3>
                  <img
                    src="./IN-flag.jpg"
                    alt="Godrej Woods"
                    className="footer-flag ml-2"
                  />
                </div>
                <div className="pIndia">
                  <p className="footer_city11">
                    <a href="https://townmanor.in/treefield/en/88585/delhi">Delhi</a> |{' '}
                    <a href="https://townmanor.in/treefield/en/88579/ghaziabad">Ghaziabad</a> |{' '}
                    <a href="https://townmanor.in/en/145/?search=%7B">Greater Noida</a> |{' '}
                    <a href="https://townmanor.in/treefield/en/88586/faridabad">Faridabad</a> |{' '}
                    <a href="https://townmanor.in/treefield/en/88577/noida">Noida</a> |{' '}
                    <a href="https://townmanor.in/treefield/en/88580/gurgaon">Gurgoan</a>
                  </p>
                </div>
              </div>
            </div>

            {/* International Properties */}
            <div className="col-xl-4 col-md-4">
              <div className="bottom-list widget-follow-us">
                <div className="d-flex">
                  <h3 style={{ paddingLeft: '0px' }}>International Properties</h3>
                  <div className="d-flex dub-flags align-items-center">
                    <img
                      src="./Dubai-flag.jpg"
                      alt="Godrej Woods"
                      className="footer-flag"
                    />
                    <img
                      src="./Flag-Doha.jpg"
                      alt="Godrej Woods"
                      className="footer-flag ml-2"
                    />
                  </div>
                </div>
                <p className="footer_city11 pDubai">
                  <a href="https://townmanor.in/treefield/en/88589/dubai">Dubai</a> |{' '}
                  <a href="https://townmanor.in/treefield/en/88590/doha">Doha</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Copyright */}
      <footer className="footer">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-md-6">
                  <div className="copyright text-left footer-content">
                    <p>© Townmanor Technologies Pvt Ltd. All Rights Reserved.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="Digipanda_Consulting footer-content">
                    <p>
                      <small>
                        Crafted with <i className="icon-heart text-danger"></i> by:{' '}
                        <a href="https://digipanda.co.in/" target="_blank">
                          Digipanda Consulting
                        </a>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
    </section>
  );
};

export default Footer;