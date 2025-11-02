// src/hooks/useApi.js

import { useReducer } from 'react';
import axios from 'axios';

// 1. تعريف الحالة الأولية للـ Reducer
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// 2. كتابة الـ Reducer لإدارة الحالات الثلاث (طلب، نجاح، فشل)
const apiReducer = (state, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return {
        ...state,
        loading: true,
        error: null, // مسح أي خطأ سابق عند بدء طلب جديد
      };
    case 'API_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case 'API_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state; // أعد الحالة كما هي إذا كان الإجراء غير معروف
  }
};

// 3. بناء الخطاف المخصص `useApi`
const useApi = () => {
  // استخدام useReducer لتخزين الحالة وإرسال الإجراءات
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // 4. تعريف دالة `request` التي ستنفذ طلبات الـ API
  const request = async (method, url, body = null) => {
    try {
      // إرسال إجراء "بدء الطلب" لتحديث الواجهة (عرض التحميل)
      dispatch({ type: 'API_REQUEST' });

      // إعداد كائن الإعدادات لـ axios
      const config = {
        method: method.toLowerCase(),
        url: url,
        data: body, // axios يستخدم خاصية `data` لإرسال الـ body
      };

      // تنفيذ الطلب الفعلي
      const response = await axios(config);

      // عند النجاح، إرسال إجراء "نجاح الطلب" مع البيانات المستلمة
      dispatch({ type: 'API_SUCCESS', payload: response.data });
      
      // إرجاع البيانات مباشرةً ليسهل التعامل معها في المكون
      return response.data;

    } catch (err) {
      // عند الفشل، استخلاص رسالة الخطأ
      const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
      
      // إرسال إجراء "فشل الطلب" مع رسالة الخطأ
      dispatch({ type: 'API_FAILURE', payload: errorMessage });
      
      // إلقاء الخطأ للسماح للمكون بمعالجته بشكل إضافي إذا لزم الأمر
      throw err;
    }
  };

  // 5. إرجاع الحالات الحالية من الـ state، بالإضافة إلى دالة `request`
  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    request, // الدالة التي ستستخدمها المكونات لتنفيذ الطلبات
  };
};

export default useApi;
