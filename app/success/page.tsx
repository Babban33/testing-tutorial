"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useDevoteeStore } from "@/store/devotee-store"

export default function SuccessPage() {
    const { name, nakshatra, resetForm } = useDevoteeStore()

    useEffect(() => {
        // Reset form after successful submission
        const timer = setTimeout(() => {
            resetForm()
        }, 5000) // Reset after 5 seconds

        return () => clearTimeout(timer)
    }, [resetForm])

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                <div className="mx-auto mb-4">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-800">Form Submitted Successfully!</CardTitle>
                <CardDescription>Thank you for providing your details</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                {name && nakshatra && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-2">Submitted Details:</h3>
                        <div className="text-sm text-green-700 space-y-1">
                            <p>
                                <strong>Name:</strong> {name}
                            </p>
                            <p>
                                <strong>Nakshatra:</strong> {nakshatra}
                            </p>
                        </div>
                    </div>
                )}

                <p className="text-sm text-muted-foreground">
                    Your information has been recorded and will be processed shortly.
                </p>

                <div className="pt-4">
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                        <Link href="/personal-details">Submit Another Form</Link>
                    </Button>
                </div>
                </CardContent>
            </Card>
        </div>
    )
}