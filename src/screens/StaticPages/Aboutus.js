import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {deviceWidth} from '../../constants/Constants';

const Aboutus = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{
          uri: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F74b543a971c26d31eb953337ff7d64f2.cdn.bubble.io%2Ff1694581734495x451542289950882940%2Ffinal%2520icon-01.png?w=256&h=37&auto=compress&dpr=1.25&fit=max',
        }}
        style={styles.image}
      />
      <Text style={styles.heading}>ABOUT US</Text>
      <Text style={styles.data}>
        Welcome to SureScanR, the premier SaaS platform designed to transform
        the way businesses engage and reward their customers. Founded on the
        belief that loyalty should be at the heart of every successful business,
        we provide cutting-edge solutions to help companies of all sizes build
        lasting and meaningful relationships with their customers.
      </Text>
      <Text style={[styles.heading, {fontSize: 20}]}>Our Mission</Text>
      <Text style={styles.data}>
        At SureScanR, our mission is to empower businesses to create
        personalized and effective loyalty programs that drive customer
        retention, increase engagement, and boost revenue. We aim to be the
        catalyst that turns occasional shoppers into loyal brand advocates
        through innovative technology and strategic insights.
      </Text>
      <Text style={[styles.heading, {fontSize: 20}]}>What We Do</Text>
      <Text style={styles.data}>
        We offer a comprehensive suite of tools and services tailored to meet
        the unique needs of each business. Our platform includes: Customizable
        Loyalty Programs: Whether you're looking to implement a points-based
        system, tiered rewards, or referral programs, our platform can be
        tailored to match your brand's unique requirements. Advanced Analytics:
        Gain insights into customer behavior and program performance with our
        robust analytics tools. Make data-driven decisions to optimize your
        loyalty initiatives. Seamless Integration: Our platform easily
        integrates with your existing systems, including CRM, eCommerce, and
        point-of-sale systems, ensuring a smooth and unified experience.
        Engaging Customer Experience: Delight your customers with a seamless and
        engaging loyalty experience across all touchpoints, from in-store to
        online interactions.
      </Text>
      <Text style={[styles.heading, {fontSize: 20}]}>Our Story</Text>
      <Text style={styles.data}>
        Founded in 2019, SureScanR was born out of a passion for enhancing
        customer relationships. Our team comprises industry veterans, tech
        enthusiasts, and customer experience experts who understand the
        challenges businesses face in today's competitive market. We've combined
        our expertise to create a platform that not only meets but exceeds the
        expectations of modern businesses and their customers.
      </Text>
      <Text style={[styles.heading, {fontSize: 20}]}>Our Values</Text>
      <Text style={styles.data}>
        Customer-Centricity: Our customers are at the heart of everything we do.
        We strive to understand their needs and exceed their expectations with
        every interaction. Innovation: We are committed to continuous
        innovation, constantly seeking new ways to enhance our platform and
        deliver exceptional value. Integrity: We believe in building trust
        through transparency, honesty, and ethical practices in all our business
        dealings. Collaboration: We work closely with our clients, partners, and
        team members to achieve common goals and foster a collaborative
        environment.
      </Text>
      <Text style={[styles.heading, {fontSize: 20}]}>Meet the Team</Text>
      <Text style={styles.data}>
        Our team is a diverse group of professionals dedicated to helping your
        business succeed. From developers and designers to customer support
        specialists, every member of our team is passionate about providing the
        best possible service and support.
      </Text>
      <Text style={[styles.heading, {fontSize: 20}]}>Join Us</Text>
      <Text style={styles.data}>
        We're always looking for talented individuals who share our vision and
        values. If you're passionate about technology and customer loyalty,
        check out our careers page for exciting opportunities to join our team.
      </Text>
      <Text style={[styles.heading, {fontSize: 20}]}>Contact Us</Text>
      <Text style={[styles.data, {marginBottom: 30}]}>
        Have questions or want to learn more about how SureScanR can help your
        business grow? Get in touch with us at
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>
          {' '}
          monil@asktbl.com{' '}
        </Text>
        or call us at
        <Text style={{fontSize: 14, fontWeight: 'bold'}}> +91-7042244895</Text>.
        We're here to help you build a loyalty program that your customers will
        love.
      </Text>
    </ScrollView>
  );
};

export default Aboutus;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    borderRadius: 10,
    width: deviceWidth - 50,
    height: 40,
    alignSelf: 'center',
  },
  data: {marginTop: 10, textAlign: 'justify', color: 'black'},
});
