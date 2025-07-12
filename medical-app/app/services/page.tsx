"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Services() {
  const services = [
    { title: "Substitute Medicines", description: "Find substitute medicines", href: "/substitute-search" },
    { title: "Drug Interactions", description: "Check drug interactions", href: "/drug-interactions" },
    { title: "Patient Management", description: "Add or view patient data", href: "/patient" },
  ]

  return (
    <main className="container mx-auto p-4">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      // our services
      >
        
      </motion.h1>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={service.href}>
                  <Button className="w-full">Go to {service.title}</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  )
}

