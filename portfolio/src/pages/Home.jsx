import { Hero } from '../components/landing/Hero'
import AboutSection from '../components/landing/AboutSection'
import ProjectsSection from '../components/projects/ProjectsSection'
import JourneySection from '../components/journey/JourneySection'
import SkillsSection from '../components/skills/SkillsSection'
import ContactSection from '../components/contact/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <JourneySection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}
