import type { NextPage } from 'next';
import { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useState } from 'react';
import { RequiredMark } from '../components/RequiredMark';
import { axiosApi } from '../lib/axios';
import { useRouter } from 'next/router';

// POSTデータの型を設置
type LoginForm = {
  email: string;
  password: string;
};

// バリデーションメッセージの型
type Validation = LoginForm & { loginFailed: string };

const Home: NextPage = () => {
  // POSTデータのstate
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  // バリデーションメッセージのstate
  const [validation, setValidation] = useState<Validation>({
    email: '',
    password: '',
    loginFailed: '',
  });

  // POSTデータの更新
  const updateLoginForm = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  //ログイン成功時の画面遷移
  const router = useRouter();

  // ログイン
  const login = () => {
    axiosApi
      // CSRF保護の初期化
      .get('/sanctum/csrf-cookie')
      .then((res) => {
        // ログイン処理
        axiosApi
          .post('/login', loginForm)
          //ログイン成功時
          .then((response: AxiosResponse) => {
            console.log(response.data);
            router.push('/memos');
          })
          //ログイン失敗時
          .catch((err: AxiosError) => {
            console.log(err.response);
          });
      });
    };

  return (
    <div className='w-2/3 mx-auto py-24'>
      <div className='w-1/2 mx-auto border-2 px-12 py-16 rounded-2xl'>
        <h3 className='mb-10 text-2xl text-center'>ログイン</h3>
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>メールアドレス</p>
            <RequiredMark />
          </div>
          {/* value属性とonChangeイベントを追加 */}
          <input
            className='p-2 border rounded-md w-full outline-none'
            name='email'
            value={loginForm.email}
            onChange={updateLoginForm}
          />
          {/* <p className='py-3 text-red-500'>必須入力です。</p> */}
        </div>
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>パスワード</p>
            <RequiredMark />
          </div>
          <small className='mb-2 text-gray-500 block'>
            8文字以上の半角英数字で入力してください
          </small>
           {/* value属性とonChangeイベントを追加 */}
          <input
            className='p-2 border rounded-md w-full outline-none'
            name='password'
            type='password'
            value={loginForm.password}
            onChange={updateLoginForm}
          />
          {/* <p className='py-3 text-red-500'>
            8文字以上の半角英数字で入力してください。
          </p> */}
        </div>
        <div className='text-center mt-12'>
          {/* <p className='py-3 text-red-500'>
            IDまたはパスワードが間違っています。
          </p> */}
          {/* onClick={login}を追加 */}
          <button
            className='bg-gray-700 text-gray-50 py-3 sm:px-20 px-10 rounded-xl cursor-pointer drop-shadow-md hover:bg-gray-600'
            onClick={login}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
