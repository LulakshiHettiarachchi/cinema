import React from 'react';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import '../styles/Footer.css';

const { Footer } = Layout;

const CustomFooter = () => {
    return (
        <Footer className="footer">
            <div className="footer-content">
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={12} md={8}>
                        <div className="footer-section about">
                            <h2 className="logo-text">
                                <span>My</span>Show.lk
                            </h2>
                            <p>
                                MyShow.lk is your one-stop destination for booking tickets
                                to the latest movies. Enjoy seamless ticketing, exciting offers,
                                and more.
                            </p>
                            <div className="social-media">
                                <FacebookOutlined />
                                <TwitterOutlined />
                                <InstagramOutlined />
                                <YoutubeOutlined />
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <div className="footer-section links">
                            <h2>Quick Links</h2>
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/about">About Us</a>
                                </li>
                                <li>
                                    <a href="/movies">Movies</a>
                                </li>
                                <li>
                                    <a href="/contact">Contact Us</a>
                                </li>
                                <li>
                                    <a href="/privacy-policy">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={8}>
                        <div className="footer-section contact-form">
                            <h2>Contact Us</h2>
                            <Form
                                action="mailto:info@myshow.lk"
                                method="post"
                                encType="text/plain"
                            >
                                <Form.Item name="email">
                                    <Input
                                        type="email"
                                        placeholder="Your email address..."
                                        className="text-input contact-input"
                                    />
                                </Form.Item>
                                <Form.Item name="message">
                                    <Input.TextArea
                                        placeholder="Your message..."
                                        className="text-input contact-input"
                                    />
                                </Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Send
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} MyShow.lk | Designed by
                MyShow.lk Team
            </div>
        </Footer>
    );
};

export default CustomFooter;
