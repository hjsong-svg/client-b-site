"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type NavItem = { label: string; href: string };

export default function Home() {
  const navItems: NavItem[] = useMemo(
    () => [
      { label: "클리닉 소개", href: "#about" },
      { label: "진료 안내", href: "#services" },
      { label: "커뮤니티", href: "#community" },
      { label: "예약", href: "#reserve" },
    ],
    [],
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [counselName, setCounselName] = useState("");
  const [counselPhone, setCounselPhone] = useState("");
  const [counselConsent, setCounselConsent] = useState(false);
  const [counselSubmitting, setCounselSubmitting] = useState(false);

  const handleCounselSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!counselConsent) {
      alert("개인정보취급방침에 동의해 주세요.");
      return;
    }
    const name = counselName.trim();
    const phone = counselPhone.trim();
    if (!name || !phone) {
      alert("이름과 전화번호를 입력해 주세요.");
      return;
    }
    setCounselSubmitting(true);
    try {
      const { error } = await supabase.from("reservation").insert({
        name,
        phone,
      });
      if (error) throw error;
      alert("상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");
      setCounselName("");
      setCounselPhone("");
      setCounselConsent(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "상담 신청에 실패했습니다.";
      alert(message);
    } finally {
      setCounselSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24 md:pb-20">
      {/* 배경 장식 */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-32 right-[-140px] h-[520px] w-[520px] rounded-full bg-blue-300/30 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-blue-600 to-sky-500 text-white shadow-sm">
              P
            </span>
            <span className="text-lg font-semibold tracking-tight">
              포즈클리닉
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="주요 메뉴"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-lg font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#reserve"
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              예약하기
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label="메뉴 열기"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="mr-2">메뉴</span>
              <span className="grid h-5 w-5 place-items-center">
                <span className="block h-0.5 w-5 rounded bg-slate-800" />
                <span className="mt-1 block h-0.5 w-5 rounded bg-slate-800" />
                <span className="mt-1 block h-0.5 w-5 rounded bg-slate-800" />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen ? (
          <div className="border-t border-slate-200/70 bg-white md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2 text-lg font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#reserve"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  예약하기
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* Main */}
      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="relative py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                전문적인 자세 교정 · 통증 관리
              </p>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                바른 자세가
                <br />
                <span className="bg-linear-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                  test2호점
                </span>
                <br />
                입니다
              </h1>

              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
                포즈클리닉은 개인 맞춤 평가를 바탕으로 자세 불균형의 원인을
                찾고, 생활 습관과 운동 처방까지 함께 설계합니다.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#reserve"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  예약하기
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  클리닉 소개 보기
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-slate-900">
                    1:1 맞춤 평가
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    자세·움직임 분석
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-slate-900">
                    전문 프로그램
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    통증·기능 개선
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur sm:col-span-1 col-span-2">
                  <div className="text-sm font-semibold text-slate-900">
                    사후 관리
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    생활 습관 가이드
                  </div>
                </div>
              </div>
            </div>

            {/* Hero card */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-30px_rgba(2,132,199,0.45)]">
                <div className="border-b border-slate-200 bg-linear-to-r from-blue-600 to-sky-500 p-6 text-white">
                  <div className="text-sm font-semibold">포즈클리닉 예약</div>
                  <div className="mt-1 text-2xl font-bold tracking-tight">
                    빠르고 간편하게
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-sm font-semibold text-slate-900">
                        상담 · 평가
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        현재 증상과 생활 패턴을 확인합니다.
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-sm font-semibold text-slate-900">
                        맞춤 솔루션
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        운동·관리 계획을 단계별로 제안합니다.
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-sm font-semibold text-slate-900">
                        꾸준한 관리
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        재평가로 변화를 추적합니다.
                      </div>
                    </div>
                  </div>

                  <a
                    href="#reserve"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    지금 예약하기
                  </a>

                  <p className="mt-3 text-center text-xs text-slate-500">
                    원하시는 일정으로 빠르게 안내드립니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anchor sections (placeholder) */}
        <section
          id="about"
          className="scroll-mt-24 border-t border-slate-200 py-14"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            클리닉 소개
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            포즈클리닉은 자세와 움직임을 기반으로 한 체계적인 평가와 전문
            프로그램으로, 일상에서 지속 가능한 변화를 목표로 합니다.
          </p>
        </section>

        <section
          id="services"
          className="scroll-mt-24 border-t border-slate-200 py-14"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            진료 안내
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "자세 평가", desc: "체형·정렬·가동성 점검" },
              { title: "통증 관리", desc: "원인 분석 및 기능 회복" },
              { title: "운동 처방", desc: "개인 맞춤 루틴 설계" },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="text-sm font-semibold text-slate-900">
                  {card.title}
                </div>
                <div className="mt-1 text-sm text-slate-600">{card.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="community"
          className="scroll-mt-24 border-t border-slate-200 py-14"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            커뮤니티
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            자세 교정 팁, 스트레칭 가이드, 공지사항을 공유하는 공간입니다.
          </p>
        </section>

        <section
          id="reserve"
          className="scroll-mt-24 border-t border-slate-200 py-14"
        >
          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              예약
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              원하시는 날짜/시간을 남겨주시면 빠르게 연락드리겠습니다.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                예약 문의하기
              </a>
              <a
                href="#top"
                className="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm hover:bg-blue-100/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                위로 올라가기
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-slate-500 sm:px-6">
          <div className="font-semibold text-slate-700">포즈클리닉</div>
          <div>
            © {new Date().getFullYear()} Pose Clinic. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 하단 고정 상담 입력창 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700 bg-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <form
          onSubmit={handleCounselSubmit}
          className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 md:gap-4 md:px-6"
        >
          <span className="order-1 w-full shrink-0 text-sm font-bold uppercase tracking-wider text-white sm:order-0 sm:w-auto">
            Counsel
          </span>
          <div className="order-2 flex flex-1 basis-full items-center overflow-hidden rounded-xl bg-white sm:order-0 sm:min-w-[200px] sm:basis-0 md:min-w-[240px]">
            <input
              type="text"
              placeholder="이름"
              value={counselName}
              onChange={(e) => setCounselName(e.target.value)}
              disabled={counselSubmitting}
              className="flex-1 border-0 bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 disabled:opacity-70"
            />
            <span className="h-5 w-px shrink-0 bg-slate-200" aria-hidden />
            <input
              type="tel"
              placeholder="전화번호"
              value={counselPhone}
              onChange={(e) => setCounselPhone(e.target.value)}
              disabled={counselSubmitting}
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 disabled:opacity-70"
            />
          </div>
          <label className="order-3 flex shrink-0 cursor-pointer items-center gap-2 sm:order-0">
            <input
              type="checkbox"
              checked={counselConsent}
              onChange={(e) => setCounselConsent(e.target.checked)}
              disabled={counselSubmitting}
              className="h-4 w-4 rounded border-2 border-white bg-transparent text-teal-500 focus:ring-2 focus:ring-teal-400 focus:ring-offset-0 focus:ring-offset-slate-800 disabled:opacity-70"
            />
            <span className="whitespace-nowrap text-sm font-medium text-white">
              개인정보취급방침동의
            </span>
          </label>
          <button
            type="submit"
            disabled={counselSubmitting}
            className="order-4 flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:order-0"
          >
            {counselSubmitting ? "전송 중..." : "상담 신청2"}
            {!counselSubmitting && (
              <span className="text-white" aria-hidden>
                →
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
