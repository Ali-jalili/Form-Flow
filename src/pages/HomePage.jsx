/** @format */

import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  GripVertical,
  Layout,
  MessageSquareText,
  Plus,
  Send,
  Share2,
  Sparkles,
  Star,
} from "lucide-react";

function HomePage() {
  const features = [
    {
      icon: Layout,
      title: "Drag & Drop Builder",
      description:
        "Build polished forms quickly with flexible fields and an intuitive editor.",
      iconClass: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: Share2,
      title: "Instant Sharing",
      description:
        "Publish your form in one click and share it with a simple public link.",
      iconClass: "bg-purple-50 text-purple-600",
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description:
        "Turn submitted responses into clear insights and useful visual reports.",
      iconClass: "bg-emerald-50 text-emerald-600",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create",
      description:
        "Build your form with flexible fields in a few simple clicks.",
    },
    {
      number: "02",
      title: "Publish",
      description:
        "Publish your form and get a shareable public link instantly.",
    },
    {
      number: "03",
      title: "Collect",
      description:
        "Collect responses and understand what your users are saying.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-white text-gray-900">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pt-32">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-180px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl" />
          <div className="absolute left-[-180px] top-[320px] h-80 w-80 rounded-full bg-purple-100/30 blur-3xl" />
          <div className="absolute right-[-180px] top-[420px] h-80 w-80 rounded-full bg-blue-100/30 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Hero copy */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Now in Public Beta
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-7xl">
              Forms that{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                work for you
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
              Create beautiful forms in minutes, share them instantly, and turn
              responses into useful insights.
            </p>

            {/* Main CTA */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-300 sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:w-auto"
              >
                See how it works
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* =====================================================
              PRODUCT PREVIEW
          ===================================================== */}
          <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
            {/* Floating response badge */}
            <div className="absolute -bottom-5 left-4 z-20 hidden items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-2.5 shadow-xl shadow-gray-200/70 sm:flex lg:-left-5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>

              <div className="text-left">
                <p className="text-[10px] font-medium text-gray-400">STATUS</p>
                <p className="text-xs font-semibold text-gray-700">
                  Collecting responses
                </p>
              </div>
            </div>

            {/* Floating analytics badge */}
            <div className="absolute -right-5 -top-5 z-20 hidden rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-xl shadow-gray-200/70 lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
                  <BarChart3 className="h-4 w-4 text-indigo-600" />
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    RESPONSES
                  </p>
                  <p className="text-sm font-bold text-gray-800">1,248</p>
                </div>
              </div>
            </div>

            {/* Browser frame */}
            <div className="rounded-2xl border border-gray-200 bg-white p-1.5 shadow-2xl shadow-indigo-100/70 sm:rounded-3xl sm:p-2">
              {/* Browser chrome */}
              <div className="flex h-11 items-center gap-1.5 rounded-t-xl bg-gray-50 px-3 sm:h-12 sm:px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />

                <div className="ml-3 flex h-7 flex-1 items-center rounded-lg border border-gray-100 bg-white px-3 sm:ml-5">
                  <span className="truncate text-[9px] text-gray-400 sm:text-[10px]">
                    app.formflow.com/builder/customer-feedback
                  </span>
                </div>
              </div>

              {/* Application */}
              <div className="overflow-hidden rounded-b-xl border-t border-gray-100 bg-gray-50 sm:rounded-b-2xl">
                <div className="flex min-h-[390px] sm:min-h-[480px]">
                  {/* Sidebar */}
                  <aside className="hidden w-48 shrink-0 border-r border-gray-100 bg-white p-5 md:block">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                        <Layout className="h-4 w-4 text-indigo-600" />
                      </div>

                      <span className="text-sm font-bold text-gray-800">
                        FormFlow
                      </span>
                    </div>

                    <div className="mt-8">
                      <p className="mb-3 px-2 text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                        Workspace
                      </p>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2.5 text-xs font-medium text-indigo-600">
                          <Layout className="h-3.5 w-3.5" />
                          My Forms
                        </div>

                        <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-gray-400">
                          <MessageSquareText className="h-3.5 w-3.5" />
                          Responses
                        </div>

                        <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-gray-400">
                          <BarChart3 className="h-3.5 w-3.5" />
                          Analytics
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-6">
                      <p className="mb-3 px-2 text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                        Forms
                      </p>

                      <div className="space-y-2">
                        <div className="rounded-lg bg-gray-50 px-3 py-2 text-[10px] font-medium text-gray-600">
                          Customer Feedback
                        </div>

                        <div className="px-3 py-2 text-[10px] text-gray-400">
                          Event Registration
                        </div>

                        <div className="px-3 py-2 text-[10px] text-gray-400">
                          Product Survey
                        </div>
                      </div>
                    </div>
                  </aside>

                  {/* Builder */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* Builder top bar */}
                    <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 sm:px-6 sm:py-4">
                      <div className="min-w-0 text-left">
                        <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                          Customer Feedback
                        </p>

                        <p className="mt-0.5 text-[9px] text-gray-400 sm:text-[10px]">
                          4 fields · Last saved just now
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="hidden rounded-lg border border-gray-200 px-3 py-2 text-[10px] font-medium text-gray-500 sm:block">
                          Preview
                        </div>

                        <div className="rounded-lg bg-indigo-600 px-3 py-2 text-[10px] font-semibold text-white shadow-sm sm:px-4">
                          Publish
                        </div>
                      </div>
                    </div>

                    {/* Builder body */}
                    <div className="flex flex-1 gap-4 p-3 sm:gap-6 sm:p-6">
                      {/* Fields editor */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <p className="text-left text-[10px] font-semibold text-gray-700 sm:text-xs">
                              Form fields
                            </p>
                            <p className="text-left text-[8px] text-gray-400 sm:text-[9px]">
                              Build and organize your form
                            </p>
                          </div>

                          <div className="hidden items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[8px] font-medium text-gray-400 sm:flex">
                            <GripVertical className="h-3 w-3" />
                            Drag to reorder
                          </div>
                        </div>

                        {/* Field 1 */}
                        <div className="group mb-2 rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm sm:mb-3 sm:p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex min-w-0 items-center gap-2">
                              <GripVertical className="h-3 w-3 shrink-0 text-gray-300" />

                              <p className="truncate text-[9px] font-semibold text-gray-700 sm:text-[10px]">
                                What is your name?
                              </p>
                            </div>

                            <span className="hidden rounded-md bg-gray-50 px-2 py-1 text-[8px] text-gray-400 sm:block">
                              Short text
                            </span>
                          </div>

                          <div className="h-8 rounded-lg border border-gray-200 bg-gray-50 sm:h-9" />
                        </div>

                        {/* Field 2 */}
                        <div className="mb-2 rounded-xl border border-indigo-200 bg-white p-3 text-left shadow-sm ring-1 ring-indigo-50 sm:mb-3 sm:p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex min-w-0 items-center gap-2">
                              <GripVertical className="h-3 w-3 shrink-0 text-indigo-300" />

                              <p className="truncate text-[9px] font-semibold text-gray-700 sm:text-[10px]">
                                How satisfied are you?
                              </p>
                            </div>

                            <span className="hidden rounded-md bg-indigo-50 px-2 py-1 text-[8px] text-indigo-500 sm:block">
                              Multiple choice
                            </span>
                          </div>

                          <div className="space-y-2">
                            {[
                              "Very satisfied",
                              "Satisfied",
                              "Not satisfied",
                            ].map((option, index) => (
                              <div
                                key={option}
                                className="flex items-center gap-2"
                              >
                                <span
                                  className={`h-3.5 w-3.5 rounded-full border ${
                                    index === 0
                                      ? "border-indigo-400 ring-2 ring-indigo-50"
                                      : "border-gray-300"
                                  }`}
                                />

                                <span className="text-[8px] text-gray-500 sm:text-[9px]">
                                  {option}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Field 3 */}
                        <div className="mb-2 hidden rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm sm:block">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-3 w-3 text-gray-300" />

                              <p className="text-[10px] font-semibold text-gray-700">
                                Rate your experience
                              </p>
                            </div>

                            <span className="rounded-md bg-gray-50 px-2 py-1 text-[8px] text-gray-400">
                              Rating
                            </span>
                          </div>

                          <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div
                                key={rating}
                                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200"
                              >
                                <Star className="h-3 w-3 text-gray-300" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Add field */}
                        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 bg-white/70 py-2.5 text-[9px] font-medium text-gray-400 sm:mt-4 sm:py-3">
                          <Plus className="h-3.5 w-3.5" />
                          Add a field
                        </div>
                      </div>

                      {/* Live preview */}
                      <div className="hidden w-[42%] max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:block">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-semibold text-gray-700">
                              Live preview
                            </p>

                            <p className="mt-0.5 text-[8px] text-gray-400">
                              What your users will see
                            </p>
                          </div>

                          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-medium text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Live
                          </span>
                        </div>

                        <div className="rounded-lg bg-gray-50 p-4">
                          <div className="mx-auto max-w-[220px] text-left">
                            <div className="mb-5">
                              <div className="h-3 w-28 rounded bg-gray-800/10" />
                              <div className="mt-2 h-2 w-36 rounded bg-gray-200" />
                            </div>

                            <div className="space-y-4">
                              <div>
                                <p className="mb-2 text-[8px] font-medium text-gray-600">
                                  What is your name?
                                </p>

                                <div className="h-7 rounded-md border border-gray-200 bg-white" />
                              </div>

                              <div>
                                <p className="mb-2 text-[8px] font-medium text-gray-600">
                                  How satisfied are you?
                                </p>

                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full border border-indigo-400" />
                                    <span className="text-[7px] text-gray-400">
                                      Very satisfied
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full border border-gray-300" />
                                    <span className="text-[7px] text-gray-400">
                                      Satisfied
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full border border-gray-300" />
                                    <span className="text-[7px] text-gray-400">
                                      Not satisfied
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-5 flex justify-end">
                              <div className="flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-[8px] font-semibold text-white">
                                Submit
                                <Send className="h-2.5 w-2.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust line */}
          <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
            <div className="flex -space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-[9px] font-bold text-indigo-600">
                A
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-purple-100 text-[9px] font-bold text-purple-600">
                M
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-[9px] font-bold text-emerald-600">
                J
              </div>
            </div>

            <p className="text-xs text-gray-400">
              Simple forms. Better responses. Less busywork.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section
        id="features"
        className="scroll-mt-24 border-t border-gray-100 bg-gray-50/60 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold text-indigo-600">
              Powerful by design
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Everything you need
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-500 sm:text-lg">
              Everything you need to create, share, and understand your forms.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${feature.iconClass}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-sm font-semibold text-indigo-600">
              Simple workflow
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              How it works
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-500 sm:text-lg">
              From an empty canvas to useful responses in three simple steps.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {/* Connector */}
            <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden border-t border-dashed border-gray-200 md:block" />

            {steps.map((step) => (
              <div key={step.number} className="relative z-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-lg font-bold text-indigo-600 shadow-lg shadow-indigo-100">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600 px-6 py-12 text-center shadow-2xl shadow-indigo-200 sm:px-12 sm:py-16">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Sparkles className="h-6 w-6 text-white" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build your first form?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-indigo-100 sm:text-lg">
              Create your first form, publish it, and start collecting responses
              in minutes.
            </p>

            <Link
              to="/signup"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-indigo-600 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
