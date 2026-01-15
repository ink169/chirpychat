"use client";

import React from "react";
import { useRef } from "react";

const Api = () => {

  const api_key_ref = useRef<HTMLInputElement>(null);
  const avatar_id_ref = useRef<HTMLInputElement>(null);
  const voice_id_ref = useRef<HTMLInputElement>(null);
  const context_id_ref = useRef<HTMLInputElement>(null);

  const session_id_ref = useRef<HTMLInputElement>(null);
  const session_token_ref = useRef<HTMLTextAreaElement>(null);

  const [show, setShow] = React.useState(false);

  const api_key_input = () => {
    if (api_key_ref.current) {
      api_key_ref.current.focus();
      console.log("Current value:", api_key_ref.current.value);
    }
  };

  const avatar_id_input = () => {
    if (avatar_id_ref.current) {
      avatar_id_ref.current.focus();
      console.log("Current value:", avatar_id_ref.current.value);
    }
  };

  const voice_id_input = () => {
    if (voice_id_ref.current) {
      voice_id_ref.current.focus();
      console.log("Current value:", voice_id_ref.current.value);
    }
  };

  const session_id_input = () => {
    if (session_id_ref.current) {
      session_id_ref.current.focus();
      console.log("Current value:", session_id_ref.current.value);
    }
  };

 const session_token_input = () => {
    if (session_token_ref.current) {
      session_token_ref.current.focus();
      console.log("Current value:", session_token_ref.current.value);
    }
  };


  const handleCreateTokenClick = async (e) => { 
    e.preventDefault();
     const response =  createHeyGenToken();  
    console.log("Create Token Response:", response);
  };

async function createHeyGenToken() {
     var server = 'http://localhost:8080/heygen-live-avatar/create-token'
      
      // https://stackoverflow.com/questions/40099282/node-fetch-api-get-with-headers
      var headers = {
          api_key: api_key_ref.current.value,
          avatar_id:avatar_id_ref.current.value,
          voice_id:voice_id_ref.current.value,
          context_id:context_id_ref.current.value,
          mode:"CUSTOM",
          language_code:"en"
       }

      const res = await fetch(server, { method: 'POST', headers: headers})

      const vals = await res.json();

      console.log(vals)
      console.log("session_id", vals.retval.session_id);
      console.log("session_token", vals.retval.session_token);
      console.log("message", vals.retval.message);      

       session_id_ref.current.value = vals.retval.session_id;
       session_token_ref.current.value = vals.retval.session_token;

      const session_id = vals.retval.session_id;
      const session_token = vals.retval.session_token;
      const message = vals.retval.message;

      setShow(true);
      
      // console.log("Session ID:", session_id);
      // console.log("Session Token:", session_token);
};

  return (
    <section id="api" className="overflow-hidden">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full">
            <div
              className="mb-12 rounded-xs bg-white px-12 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h4 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Create HeyGen Token
              </h4>
              <p className="mb-12 text-base font-medium text-body-color">
                Call HeyGen LiveAvatar API and retrieve a session token.
              </p>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="api_key"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        API Key
                      </label>
                      <input
                        type="text"
                        ref={api_key_ref}
                        id="api_key"
                        placeholder="Enter your API key"
                        className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="avatar_id"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Avatar ID
                      </label>
                      <input
                        type="text"
                        id="avatar_id"
                        ref={avatar_id_ref}
                        placeholder="Enter Avatar ID"
                        className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="voice_id"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Voice ID
                      </label>
                      <input
                        type="text"
                        id="voice_id"
                        ref={voice_id_ref}
                        placeholder="Enter your Voice ID"
                        className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="context_id"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Context ID
                      </label>
                      <input
                        type="text"    
                        id="context_id"
                        ref={context_id_ref}
                        placeholder="Enter Context ID"
                        className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>                 
                
                  <div className="w-full px-4">
                    <button 
                    onClick={ handleCreateTokenClick }
                       className="rounded-xs bg-primary px-2 py-4 text-base font-small text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Test Create Token
                    </button>
                  </div>
                  {/* Session Details */}
                  <div className={ `${show ? 'block' : 'hidden'} container` }>                   
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="session_id"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Session Id
                        </label>
                        <input
                          readOnly
                          type="text"
                          id="session_id"
                          ref={session_id_ref}
                          placeholder="session id"
                          className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="session_token"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Session Token 
                        </label>
                        <textarea
                          readOnly
                          name="session_token"
                          rows={3}
                          ref={session_token_ref}
                          className="border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



export default Api;
