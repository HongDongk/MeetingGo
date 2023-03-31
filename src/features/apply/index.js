import { createSlice } from '@reduxjs/toolkit';

export const APPLY_STORAGE_KEY = 'apply-data';

const initialState = {
  finishedStep: 0,
  gender: 1, // 1: 남자, 2: 여자
  memberCount: 3, // 2: 2대2, 3: 3대3
  universities: [],
  availableDates: [],
  areas: [],
  members: [{}, {}, {}],
  intro: '',
  drink: 3,
  prefSameUniversity: true,
  prefAge: [22, 27],
  prefVibes: [],
};

const applySlice = createSlice({
  name: 'apply',
  initialState: {
    ...initialState,
    ...JSON.parse(localStorage.getItem(APPLY_STORAGE_KEY) || '{}'),
  },
  reducers: {
    submitStep1: (state, action) => {
      const { gender, memberCount, universities } = action.payload;

      state.finishedStep = 1;
      state.gender = gender;
      state.memberCount = memberCount;
      state.universities = universities;

      const stored = localStorage.getItem('apply-data');
      localStorage.setItem(
        APPLY_STORAGE_KEY,
        JSON.stringify({
          ...JSON.parse(stored),
          ...action.payload,
          finishedStep: state.finishedStep,
        }),
      );
    },
    submitStep2: (state, action) => {
      const { availableDates, areas } = action.payload;

      state.finishedStep = 2;
      state.availableDates = availableDates;
      state.areas = areas;

      const stored = localStorage.getItem('apply-data');
      localStorage.setItem(
        APPLY_STORAGE_KEY,
        JSON.stringify({
          ...JSON.parse(stored),
          ...action.payload,
          finishedStep: state.finishedStep,
        }),
      );
    },
    submitStep3: (state, action) => {
      const { members } = action.payload;

      state.finishedStep = 3;
      state.members = members;

      const stored = localStorage.getItem('apply-data');
      localStorage.setItem(
        APPLY_STORAGE_KEY,
        JSON.stringify({
          ...JSON.parse(stored),
          ...action.payload,
          finishedStep: state.finishedStep,
        }),
      );
    },
    submitStep4: (state, action) => {
      const { intro } = action.payload;

      state.finishedStep = 4;
      state.intro = intro;

      const stored = localStorage.getItem('apply-data');
      localStorage.setItem(
        APPLY_STORAGE_KEY,
        JSON.stringify({
          ...JSON.parse(stored),
          ...action.payload,
          finishedStep: state.finishedStep,
        }),
      );
    },
    submitStep5: (state, action) => {
      const { drink, prefAge, prefSameUniversity, prefVibes } = action.payload;

      state.finishedStep = 5;
      state.drink = drink;
      state.prefAge = prefAge;
      state.prefSameUniversity = prefSameUniversity;
      state.prefVibes = prefVibes;

      const stored = localStorage.getItem('apply-data');
      localStorage.setItem(
        APPLY_STORAGE_KEY,
        JSON.stringify({
          ...JSON.parse(stored),
          ...action.payload,
          finishedStep: state.finishedStep,
        }),
      );
    },
    submitDate: (state, action) => {
      const { availableDates } = action.payload;

      state.finishedStep = 5; // 날짜만 재선택하는 경우이므로
      state.availableDates = availableDates;

      const stored = localStorage.getItem('apply-data');
      localStorage.setItem(
        APPLY_STORAGE_KEY,
        JSON.stringify({
          ...JSON.parse(stored),
          ...action.payload,
          finishedStep: state.finishedStep,
        }),
      );
    },
  },
});

export const {
  submitStep1,
  submitStep2,
  submitStep3,
  submitStep4,
  submitStep5,
  submitDate,
} = applySlice.actions;

export default applySlice.reducer;
