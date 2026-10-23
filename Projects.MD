# Multi-Class Parking Stand Recommendation System for Apron Movement Control (AMC) (Thesis)

## Project Overview
A web-based Apron Movement Control (AMC) information system integrated with a Random Forest machine learning model designed to automate and accelerate parking stand allocation decisions at Halim Perdanakusuma Airport.

## Problem Statement
* Manual parking stand allocation heavily relies on operator experience, leading to recurring delays during heavy traffic.
* Manual allocation previously required 1–2 minutes per decision, causing approximately 2 delays per month during peak hours.
* Addressed against a scale of 668,928 national flight movements in 2024.

## Tech Stack & Methodology
* **Lifecycle:** CRISP-DM (Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, Deployment)
* **Core Algorithm:** Random Forest Classifier (`n_estimators = 200`, `class_weight = balanced_subsample`, +SMOTE)
* **Dataset:** 5,190 records (May–July 2025) across 17 parking stand classes
* **Input Features:** Aircraft type, operator airline, and category
* **Deployment Platform:** Web-based AMC Information System

## Feature Importance
* Stand Zone: 38.16%
* Operator Airline: 21.45%
* Aircraft Type: 19.04%
* Category: 11.17%

## Key Results & Impact
* **Model Accuracy:** 80.15% Top-3 Accuracy | 98.94% Top-5 Accuracy
* **System Testing:** 100% pass rate on Black-Box Testing (23/23 test cases)
* **Business Value:** Achieved an 88–94% reduction in allocation decision time


# spotifai — Offline Music Player (Android) (side project)

## Overview
Android app that resolves a YouTube URL, downloads the audio on-device, and plays it back with a Spotify-style UI. Fully offline, no backend.

## Tech Stack
* **Kotlin** · Jetpack Compose · Material3
* **Playback:** ExoPlayer + `MediaSessionService` (background, lock screen controls)
* **Download:** NewPipeExtractor + OkHttp (chunked HTTP Range requests)
* **Storage:** Room (SQLite) — songs, playlists, ordering
* **CI/CD:** GitHub Actions — auto-builds signed APK on every push

## Key Engineering Highlights
* End-to-end audio pipeline: URL resolution → chunked download → offline playback
* Foreground download service with queue management and real-time progress
* Shuffle/Repeat/Sleep Timer via custom `MediaSession` commands
* Normalized Room schema with foreign-key cascade; drag-to-reorder queue & playlists


# Airline Sentiment Analysis & Continuous Learning Platform (Course Project)

## Project Overview
An end-to-end sentiment analytics and continuous learning web platform that classifies customer sentiment on commercial airline tweets, explains prediction reasoning, and incorporates human-in-the-loop review workflows for automated model retraining and version management.

## Problem Statement
* Airlines receive thousands of high-velocity customer tweets daily, where negative feedback accounts for over 62% of volume and demands rapid triage.
* Static machine learning models suffer from data drift and cannot incorporate ground-truth operator corrections over time.
* Addressed across 14,640 customer tweets spanning 6 major commercial airlines.

## Tech Stack & Methodology
* **Lifecycle:** CRISP-DM (Data Exploration, Text Preprocessing, TF-IDF Vectorization, Multi-Model Evaluation, Continuous Deployment)
* **Core Algorithms:** Linear Support Vector Classifier (`LinearSVC`, class-weighted), Complement Naive Bayes (`ComplementNB`), Logistic Regression
* **Dataset:** 14,640 tweets across 6 major airlines (Negative: 62.69%, Neutral: 21.17%, Positive: 16.14%)
* **Backend & Pipeline:** Python · Flask · scikit-learn · NLTK · Celery + Redis (async background retraining) · MySQL / SQLAlchemy
* **Frontend & Explainability:** Vanilla CSS & Tailwind CSS · Plotly / Matplotlib analytics · Real-time feature importance coefficient extraction
* **Testing & QA:** Pytest continuous learning test suite · Puppeteer automated end-to-end testing (7/7 test cases)

## Key Results & Engineering Highlights
* **Model Accuracy:** 76.26% Accuracy on Linear SVC (0.852 F1-score for Negative Sentiment; 0.763 Weighted F1)
* **Human-in-the-Loop Continuous Learning:** Admin review workflow with true-sentiment validation triggering automated model retraining (≥50 review threshold)
* **Prediction Explainability:** Real-time extraction of influential token coefficients providing transparent reasoning behind every classification
* **Model Versioning & Rollback:** Version registry tracking performance metrics, training sample counts, and confusion matrices with zero-downtime rollback capability
