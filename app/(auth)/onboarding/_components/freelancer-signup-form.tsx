"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FreelancerSignUpFormProps {
  onSuccess: () => void
}

export function FreelancerSignUpForm({ onSuccess }: FreelancerSignUpFormProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSuccess(); }} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Enter your full name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Create a password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" placeholder="Confirm your password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Input id="skills" placeholder="Enter your skills (comma-separated)" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself and your experience" required />
        </div>
      </div>
      <Button type="submit" className="w-full">Create Freelancer Account</Button>
      <p className="text-sm text-center text-muted-foreground">
        By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </form>
  )
}

