
import React, { useState, useEffect, useRef } from 'react';

// Define supported languages
type LanguageCode = 
  'af-ZA' | 'hy-AM' | 'as-IN' | 'az-AZ' | 'be-BY' | 'bs-BA' | 'bg-BG' | 'ca-ES' | 
  'ceb-PH' | 'ny-MW' | 'zh-CN' | 'hr-HR' | 'cs-CZ' | 'da-DK' | 'nl-NL' | 'en-US' | 
  'en-IN' | 'et-EE' | 'fil-PH' | 'fi-FI' | 'fr-FR' | 'gl-ES' | 'ka-GE' | 'de-DE' | 
  'el-GR' | 'gu-IN' | 'ha-NG' | 'he-IL' | 'hi-IN' | 'hu-HU' | 'is-IS' | 'id-ID' | 
  'ga-IE' | 'it-IT' | 'ja-JP' | 'jv-ID' | 'kn-IN' | 'kk-KZ' | 'ky-KG' | 'ko-KR' | 
  'lv-LV' | 'ln-CD' | 'lt-LT' | 'lb-LU' | 'mk-MK' | 'ms-MY' | 'ml-IN' | 'mr-IN' | 
  'ne-NP' | 'no-NO' | 'ps-AF' | 'pt-PT' | 'pa-IN' | 'ro-RO' | 'ru-RU' | 'sr-RS' | 
  'sd-IN' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'es-ES' | 'sw-KE' | 'sv-SE' | 'ta-IN' | 
  'te-IN' | 'th-TH' | 'tr-TR' | 'uk-UA' | 'ur-PK' | 'vi-VN' | 'cy-GB' | 'ar-SA' | 'bn-IN';

const TryAgentDemo: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
  const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string}[]>([
    { role: 'agent', text: 'Hello! I am your AI assistant. Ask me anything about ProAutoDial.' }
  ]);
  const [transcript, setTranscript] = useState('');
  
  // Configuration State
  const [demoMode, setDemoMode] = useState<'web' | 'call'>('web');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en-US');
  const [selectedPersona, setSelectedPersona] = useState<string>('sarah');
  // @ts-ignore
  const [elevenLabsKey, setElevenLabsKey] = useState(import.meta.env.VITE_ELEVENLABS_API_KEY || '');
  
  // Ringg.ai State
  // @ts-ignore
  const [ringgApiKey, setRinggApiKey] = useState(import.meta.env.VITE_RINGG_API_KEY || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [calleeName, setCalleeName] = useState('Guest');
  const [agentId, setAgentId] = useState('');
  const [fromNumberId, setFromNumberId] = useState('');
  const [availableNumbers, setAvailableNumbers] = useState<any[]>([]);
  const [availableAgents, setAvailableAgents] = useState<any[]>([]);
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'success' | 'error'>('idle');
  const [callStatusMsg, setCallStatusMsg] = useState('');
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Dropdown States
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');

  const recognitionRef = useRef<any>(null);

  // Fetch Ringg.ai data on mount or when API key changes
  useEffect(() => {
    if (demoMode === 'call') {
        fetchRinggData();
    }
  }, [demoMode, ringgApiKey]);

  const fetchRinggData = async () => {
      setFetchStatus('loading');
      try {
          const [numbersRes, agentsRes] = await Promise.all([
             fetch('/ringg-api/workspace/numbers', { headers: { 'X-API-KEY': ringgApiKey } }),
             fetch('/ringg-api/agent/all', { headers: { 'X-API-KEY': ringgApiKey } })
          ]);
          
          if (!numbersRes.ok || !agentsRes.ok) {
             throw new Error(`Status: ${numbersRes.status} / ${agentsRes.status}`);
          }

          const numbersData = await numbersRes.json();
          const agentsData = await agentsRes.json();

          if (numbersData.workspace_numbers) {
              setAvailableNumbers(numbersData.workspace_numbers);
              if (numbersData.workspace_numbers.length > 0 && !fromNumberId) {
                  setFromNumberId(numbersData.workspace_numbers[0].id);
              }
          }
          
          if (agentsData.data && agentsData.data.agents) {
              const outboundAgents = agentsData.data.agents.filter((a: any) => a.agent_type === 'outbound');
              setAvailableAgents(outboundAgents);
              if (outboundAgents.length > 0 && !agentId) {
                  setAgentId(outboundAgents[0].id);
              }
          }
          
          setFetchStatus('success');
      } catch (e) {
          console.error("Failed to fetch Ringg data", e);
          setFetchStatus('error');
      }
  };
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isActiveRef = useRef(false);
  const transcriptRef = useRef('');

  // Update refs when state changes
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  const languages: { code: LanguageCode, label: string, flag: string }[] = [
    { code: 'af-ZA', label: 'Afrikaans', flag: '🇿🇦' },
    { code: 'hy-AM', label: 'Armenian', flag: '🇦🇲' },
    { code: 'as-IN', label: 'Assamese', flag: '🇮🇳' },
    { code: 'az-AZ', label: 'Azerbaijani', flag: '🇦🇿' },
    { code: 'be-BY', label: 'Belarusian', flag: '🇧🇾' },
    { code: 'bn-IN', label: 'Bengali', flag: '🇮🇳' },
    { code: 'bs-BA', label: 'Bosnian', flag: '🇧🇦' },
    { code: 'bg-BG', label: 'Bulgarian', flag: '🇧🇬' },
    { code: 'ca-ES', label: 'Catalan', flag: '🇪🇸' },
    { code: 'ceb-PH', label: 'Cebuano', flag: '🇵🇭' },
    { code: 'ny-MW', label: 'Chichewa', flag: '🇲🇼' },
    { code: 'zh-CN', label: 'Chinese', flag: '🇨🇳' },
    { code: 'hr-HR', label: 'Croatian', flag: '🇭🇷' },
    { code: 'cs-CZ', label: 'Czech', flag: '🇨🇿' },
    { code: 'da-DK', label: 'Danish', flag: '🇩🇰' },
    { code: 'nl-NL', label: 'Dutch', flag: '🇳🇱' },
    { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { code: 'en-IN', label: 'English (India)', flag: '🇮🇳' },
    { code: 'et-EE', label: 'Estonian', flag: '🇪🇪' },
    { code: 'fil-PH', label: 'Filipino', flag: '🇵🇭' },
    { code: 'fi-FI', label: 'Finnish', flag: '🇫🇮' },
    { code: 'fr-FR', label: 'French', flag: '🇫🇷' },
    { code: 'gl-ES', label: 'Galician', flag: '🇪🇸' },
    { code: 'ka-GE', label: 'Georgian', flag: '🇬🇪' },
    { code: 'de-DE', label: 'German', flag: '🇩🇪' },
    { code: 'el-GR', label: 'Greek', flag: '🇬🇷' },
    { code: 'gu-IN', label: 'Gujarati', flag: '🇮🇳' },
    { code: 'ha-NG', label: 'Hausa', flag: '🇳🇬' },
    { code: 'he-IL', label: 'Hebrew', flag: '🇮🇱' },
    { code: 'hi-IN', label: 'Hindi', flag: '🇮🇳' },
    { code: 'hu-HU', label: 'Hungarian', flag: '🇭🇺' },
    { code: 'is-IS', label: 'Icelandic', flag: '🇮🇸' },
    { code: 'id-ID', label: 'Indonesian', flag: '🇮🇩' },
    { code: 'ga-IE', label: 'Irish', flag: '🇮🇪' },
    { code: 'it-IT', label: 'Italian', flag: '🇮🇹' },
    { code: 'ja-JP', label: 'Japanese', flag: '🇯🇵' },
    { code: 'jv-ID', label: 'Javanese', flag: '🇮🇩' },
    { code: 'kn-IN', label: 'Kannada', flag: '🇮🇳' },
    { code: 'kk-KZ', label: 'Kazakh', flag: '🇰🇿' },
    { code: 'ky-KG', label: 'Kirgiz', flag: '🇰🇬' },
    { code: 'ko-KR', label: 'Korean', flag: '🇰🇷' },
    { code: 'lv-LV', label: 'Latvian', flag: '🇱🇻' },
    { code: 'ln-CD', label: 'Lingala', flag: '🇨🇩' },
    { code: 'lt-LT', label: 'Lithuanian', flag: '🇱🇹' },
    { code: 'lb-LU', label: 'Luxembourgish', flag: '🇱🇺' },
    { code: 'mk-MK', label: 'Macedonian', flag: '🇲🇰' },
    { code: 'ms-MY', label: 'Malay', flag: '🇲🇾' },
    { code: 'ml-IN', label: 'Malayalam', flag: '🇮🇳' },
    { code: 'mr-IN', label: 'Marathi', flag: '🇮🇳' },
    { code: 'ne-NP', label: 'Nepali', flag: '🇳🇵' },
    { code: 'no-NO', label: 'Norwegian', flag: '🇳🇴' },
    { code: 'ps-AF', label: 'Pashto', flag: '🇦🇫' },
    { code: 'pt-PT', label: 'Portuguese', flag: '🇵🇹' },
    { code: 'pa-IN', label: 'Punjabi', flag: '🇮🇳' },
    { code: 'ro-RO', label: 'Romanian', flag: '🇷🇴' },
    { code: 'ru-RU', label: 'Russian', flag: '🇷🇺' },
    { code: 'sr-RS', label: 'Serbian', flag: '🇷🇸' },
    { code: 'sd-IN', label: 'Sindhi', flag: '🇮🇳' },
    { code: 'sk-SK', label: 'Slovak', flag: '🇸🇰' },
    { code: 'sl-SI', label: 'Slovenian', flag: '🇸🇮' },
    { code: 'so-SO', label: 'Somali', flag: '🇸🇴' },
    { code: 'es-ES', label: 'Spanish', flag: '🇪🇸' },
    { code: 'sw-KE', label: 'Swahili', flag: '🇰🇪' },
    { code: 'sv-SE', label: 'Swedish', flag: '🇸🇪' },
    { code: 'ta-IN', label: 'Tamil', flag: '🇮🇳' },
    { code: 'te-IN', label: 'Telugu', flag: '🇮🇳' },
    { code: 'th-TH', label: 'Thai', flag: '🇹🇭' },
    { code: 'tr-TR', label: 'Turkish', flag: '🇹🇷' },
    { code: 'uk-UA', label: 'Ukrainian', flag: '🇺🇦' },
    { code: 'ur-PK', label: 'Urdu', flag: '🇵🇰' },
    { code: 'vi-VN', label: 'Vietnamese', flag: '🇻🇳' },
    { code: 'cy-GB', label: 'Welsh', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
    { code: 'ar-SA', label: 'Arabic', flag: '🇸🇦' }
  ];

  const personas = [
    { id: 'sarah', label: 'Sarah (Warm)', gender: 'female', voiceId: 'm5qndnI7u4OAdXhH0Mr5' },
    { id: 'michael', label: 'Michael (Professional)', gender: 'male', voiceId: 'F7GMQO95j6u8e7Q7q3tV' },
    { id: 'arjun', label: 'Arjun (Energetic)', gender: 'male', voiceId: '2EiwWnXFnvU5JabPnv8n' },
    { id: 'priya', label: 'Priya (Friendly)', gender: 'female', voiceId: 'EXAVITQu4vr4xnSDxMaL' },
    { id: 'liam', label: 'Liam (Assertive)', gender: 'male', voiceId: 'XB0fDUnXU5powFXDhCwa' },
    { id: 'charlotte', label: 'Charlotte (Calm)', gender: 'female', voiceId: 'Xb7hH8MSIVanZSPOz002' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = selectedLanguage;

        recognitionRef.current.onstart = () => {
          setStatus('listening');
        };

        recognitionRef.current.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;
          setTranscript(transcriptText);
        };

        recognitionRef.current.onend = () => {
          // If no transcript was captured but we were active, restart listening
          if (!transcriptRef.current && isActiveRef.current) {
             try {
               recognitionRef.current.start();
             } catch (e) {
               console.error("Restart error", e);
               setStatus('idle');
               setIsActive(false);
             }
          } else if (transcriptRef.current) {
            handleUserMessage(transcriptRef.current);
          } else {
            // Should only happen if manually stopped
            setStatus('idle');
          }
        };

        recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
               setStatus('idle');
               setIsActive(false);
            } else {
               // For other errors, try to restart if active, or stop
               if (isActiveRef.current) {
                   // Short delay before retry
                   setTimeout(() => {
                       try { recognitionRef.current.start(); } catch(e) {}
                   }, 100);
               } else {
                   setStatus('idle');
               }
            }
        };
      }

      // Initialize Speech Synthesis
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
    }
  }, [selectedLanguage]); // Only re-init when language changes

  const handleUserMessage = (text: string) => {
    setStatus('processing');
    // Stop recognition while processing/speaking
    if (recognitionRef.current) recognitionRef.current.stop();
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setTranscript(''); 

    // Simulate AI processing delay
    setTimeout(() => {
      const response = generateAIResponse(text);
      setMessages(prev => [...prev, { role: 'agent', text: response }]);
      speakResponse(response);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lower = input.toLowerCase();
    
    // Telugu
    if (selectedLanguage === 'te-IN') {
        if (lower.includes('price') || lower.includes('cost')) return "మా స్టార్టర్ ప్లాన్ నెలకు కేవలం ₹4,999 నుండి ప్రారంభమవుతుంది.";
        if (lower.includes('demo')) return "నేను మీ కోసం డెమోని షెడ్యూల్ చేయగలను.";
        return "అదొక మంచి ప్రశ్న. ProAutoDial AI-ఆధారిత టెలిఫోనీ పరిష్కారాలలో ప్రత్యేకత కలిగి ఉంది.";
    }
    // Tamil
    if (selectedLanguage === 'ta-IN') {
        if (lower.includes('price')) return "எங்கள் ஸ்டார்டர் திட்டம் மாதம் ₹4,999 முதல் தொடங்குகிறது.";
        if (lower.includes('demo')) return "நான் உங்களுக்காக ஒரு டெமோவை திட்டமிட முடியும்.";
        return "அது ஒரு நல்ல கேள்வி. ProAutoDial AI- அடிப்படையிலான தொலைபேசி தீர்வுகளில் நிபுணத்துவம் பெற்றது.";
    }
    // Kannada
    if (selectedLanguage === 'kn-IN') {
        if (lower.includes('price')) return "ನಮ್ಮ ಸ್ಟಾರ್ಟರ್ ಪ್ಲಾನ್ ತಿಂಗಳಿಗೆ ₹4,999 ರಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.";
        return "ಅದು ಉತ್ತಮ ಪ್ರಶ್ನೆ. ProAutoDial AI ಆಧಾರಿತ ಟೆಲಿಫೋನಿ ಪರಿಹಾರಗಳಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿದೆ.";
    }
    // Malayalam
    if (selectedLanguage === 'ml-IN') {
        if (lower.includes('price')) return "ഞങ്ങളുടെ സ്റ്റാർട്ടർ പ്ലാൻ പ്രതിമാസം ₹4,999 മുതൽ ആരംഭിക്കുന്നു.";
        return "അതൊരു നല്ല ചോദ്യമാണ്. ProAutoDial AI അധിഷ്ഠിത ടെലിഫോണി സൊല്യൂഷനുകളിൽ സ്പെഷ്യലൈസ് ചെയ്യുന്നു.";
    }
    // Hindi
    if (selectedLanguage === 'hi-IN') {
      if (lower.includes('price')) return "हमारा स्टार्टर प्लान सिर्फ ₹4,999 प्रति माह से शुरू होता है।";
      return "यह एक बहुत अच्छा सवाल है। ProAutoDial आपके व्यवसाय के लिए एआई-संचालित टेलीफोनी समाधानों में माहिर है।";
    }
    // Marathi
    if (selectedLanguage === 'mr-IN') {
      if (lower.includes('price')) return "आमची स्टार्टर योजना महिन्याला फक्त ₹4,999 पासून सुरू होते.";
      return "हा एक चांगला प्रश्न आहे. ProAutoDial AI-आधारित टेलिफोनी सोल्यूशन्समध्ये माहिर आहे.";
    }
    // Bengali
    if (selectedLanguage === 'bn-IN') {
      if (lower.includes('price')) return "আমাদের স্টার্টার প্ল্যান মাসে মাত্র ₹4,999 থেকে শুরু হয়।";
      return "এটি একটি খুব ভালো প্রশ্ন। ProAutoDial এআই-চালিত টেলিফোনি সমাধানে বিশেষজ্ঞ।";
    }
    // Gujarati
    if (selectedLanguage === 'gu-IN') {
      if (lower.includes('price')) return "અમારો સ્ટાર્ટર પ્લાન મહિનાના માત્ર ₹4,999 થી શરૂ થાય છે.";
      return "તે ખૂબ જ સારો પ્રશ્ન છે. ProAutoDial AI-આધારિત ટેલિફોની સોલ્યુશન્સમાં નિષ્ણાત છે.";
    }
    // Punjabi
    if (selectedLanguage === 'pa-IN') {
      if (lower.includes('price')) return "ਸਾਡਾ ਸਟਾਰਟਰ ਪਲਾਨ ਮਹੀਨੇ ਦੇ ਸਿਰਫ ₹4,999 ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ।";
      return "ਇਹ ਬਹੁਤ ਵਧੀਆ ਸਵਾਲ ਹੈ। ProAutoDial AI-ਅਧਾਰਿਤ ਟੈਲੀਫੋਨੀ ਹੱਲਾਂ ਵਿੱਚ ਮਾਹਰ ਹੈ।";
    }
    // German
    if (selectedLanguage === 'de-DE') {
       if (lower.includes('price') || lower.includes('kosten')) return "Unsere Preise beginnen bei nur 19 € pro Monat.";
       return "Das ist eine gute Frage. ProAutoDial ist auf KI-gesteuerte Telefonielösungen spezialisiert.";
    }
    // French
    if (selectedLanguage === 'fr-FR') {
       if (lower.includes('price') || lower.includes('prix')) return "Nos tarifs commencent à seulement 19 € par mois.";
       return "C'est une excellente question. ProAutoDial est spécialisé dans les solutions de téléphonie par IA.";
    }
    // Arabic
    if (selectedLanguage === 'ar-SA') {
       if (lower.includes('price') || lower.includes('سعر')) return "تبدأ أسعارنا من 19 دولارًا فقط شهريًا.";
       return "هذا سؤال رائع. تتخصص ProAutoDial في حلول الهاتف المدعومة بالذكاء الاصطناعي.";
    }
    // Spanish
    if (selectedLanguage === 'es-ES') {
       if (lower.includes('price')) return "Nuestros precios comienzan desde solo $19 al mes.";
       return "Esa es una gran pregunta. ProAutoDial se especializa en soluciones de telefonía impulsadas por IA.";
    }

    // English Default
    if (lower.includes('price') || lower.includes('cost')) return "Our pricing starts at just ₹4,999 per month for the Starter plan.";
    if (lower.includes('demo')) return "I can schedule a demo for you. Would you like to book a slot for tomorrow?";
    return "That's a great question. ProAutoDial specializes in AI-driven telephony solutions tailored for your business.";
  };

  const speakResponse = async (text: string) => {
    setStatus('speaking');
    
    // Stop any current audio
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
    }
    if (synthRef.current) {
        synthRef.current.cancel();
    }

    // ElevenLabs Integration
    if (elevenLabsKey) {
        try {
            const persona = personas.find(p => p.id === selectedPersona);
            const voiceId = persona?.voiceId || 'm5qndnI7u4OAdXhH0Mr5'; // Fallback to Sarah
            
            // Determine model based on language
            const modelId = selectedLanguage.startsWith('en') ? 'eleven_monolingual_v1' : 'eleven_multilingual_v2';
            
            // Using local proxy /elevenlabs-api -> https://api.elevenlabs.io/v1
            const response = await fetch(`/elevenlabs-api/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'xi-api-key': elevenLabsKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    model_id: modelId,
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    }
                }),
            });

            if (!response.ok) throw new Error('ElevenLabs API failed');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audioRef.current = audio;
            
            audio.onended = () => {
                setStatus('idle');
                setIsActive(false);
                URL.revokeObjectURL(url);
            };
            
            audio.onerror = (e) => {
                console.error("Audio playback error", e);
                speakNative(text);
            };

            await audio.play();
            return;

        } catch (e) {
            console.error("ElevenLabs error, falling back to native", e);
        }
    }

    speakNative(text);
  };

  const speakNative = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      
      const voices = synthRef.current.getVoices();
      
      const findVoice = (langCode: string, genderPreference: 'female' | 'male') => {
         // Normalized search to handle underscores vs dashes
         const code = langCode.toLowerCase();
         return voices.find(v => 
            v.lang.toLowerCase().replace('_', '-').includes(code) && 
            (genderPreference === 'female' ? v.name.toLowerCase().includes('female') : v.name.toLowerCase().includes('male'))
         ) || voices.find(v => v.lang.toLowerCase().replace('_', '-').includes(code));
      };

      // Try specific region first, then generic language code
      const regionCode = selectedLanguage; 
      const genericCode = selectedLanguage.split('-')[0];
      const gender = personas.find(p => p.id === selectedPersona)?.gender || 'female' as 'female' | 'male';

      let preferredVoice = findVoice(regionCode, gender as 'female' | 'male') || findVoice(genericCode, gender as 'female' | 'male');

      if (preferredVoice) {
          utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        setStatus('idle');
        setIsActive(false);
      };
      
      utterance.onerror = (e) => {
          console.error("Speech synthesis error", e);
          setStatus('idle');
          setIsActive(false);
      }

      synthRef.current.speak(utterance);
    } else {
      setTimeout(() => {
        setStatus('idle');
        setIsActive(false);
      }, 3000);
    }
  };

  const toggleInteraction = () => {
    if (isActive) {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (synthRef.current) synthRef.current.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsActive(false);
      setStatus('idle');
    } else {
      setIsActive(true);
      setMessages([]); 
      setTranscript('');
      
      if (recognitionRef.current) {
        recognitionRef.current.lang = selectedLanguage;
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error("Mic error", e);
          simulateConversation();
        }
      } else {
        simulateConversation();
      }
    }
  };

  const simulateConversation = () => {
    setStatus('listening');
    let simText = "Tell me about your auto dialer.";
    if (selectedLanguage.startsWith('hi')) simText = "क्या आप मुझे अपने ऑटो डायलर के बारे में बता सकते हैं?";
    else if (selectedLanguage.startsWith('te')) simText = "మీ ఆటో డయలర్ గురించి చెప్పండి.";
    else if (selectedLanguage.startsWith('ta')) simText = "உங்கள் ஆட்டோ டயலர் பற்றி சொல்லுங்கள்.";
    else if (selectedLanguage.startsWith('ar')) simText = "أخبرني عن المسجل الآلي الخاص بك.";
    
    setTimeout(() => {
      setTranscript(simText);
      setTimeout(() => {
        handleUserMessage(simText);
      }, 1000);
    }, 2000);
  };

  const handleRinggCall = async () => {
    if (!phoneNumber) {
      setCallStatus('error');
      setCallStatusMsg('Please enter a phone number');
      return;
    }

    setCallStatus('calling');
    setCallStatusMsg('Initiating call via Ringg.ai...');

    try {
       // Using local proxy (configured in vite.config.ts) to bypass CORS
       // Maps /ringg-api -> https://prod-api.ringg.ai/ca/api/v0
       // Correct Endpoint: /calling/outbound/individual
       const response = await fetch('/ringg-api/calling/outbound/individual', {
          method: 'POST',
          headers: {
             'X-API-KEY': ringgApiKey,
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             name: calleeName,
             mobile_number: phoneNumber,
             agent_id: agentId,
             from_number_id: fromNumberId,
          })
       });

       if (!response.ok) {
           const errData = await response.json().catch(() => ({}));
           console.error("Ringg API Error:", errData);
           throw new Error(errData.detail || errData.message || `API Error: ${response.status}`);
       }

       const data = await response.json();
       setCallStatus('success');
       setCallStatusMsg(`Call initiated! ID: ${data.call_id || data.id || 'Success'}`);
       
    } catch (e: any) {
        console.error("Call failed", e);
        setCallStatus('error');
        setCallStatusMsg(`Failed: ${e.message}. (Ensure Vite server was restarted for proxy)`);
    }
  };

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20">
            <span className="w-2 h-2 bg-brand rounded-full animate-ping"></span>
            NuPlay Engine Active
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
            Configure Your <br />
            <span className="text-brand">Perfect Agent</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Select a language and persona below, then click to talk. Experience how our AI adapts to your brand instantly.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center">
            <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-xl inline-flex">
                <button 
                   onClick={() => setDemoMode('web')}
                   className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${demoMode === 'web' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                   <i className="fas fa-globe mr-2"></i> Web Demo
                </button>
                <button 
                   onClick={() => setDemoMode('call')}
                   className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${demoMode === 'call' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                   <i className="fas fa-phone mr-2"></i> Live Call
                </button>
            </div>
        </div>

        {demoMode === 'web' ? (
          <>
        {/* Configuration Panel */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-8">
           
           {/* Voice Engine Status */}
           <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${elevenLabsKey ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-slate-100 text-slate-400'}`}>
                    <i className="fas fa-wave-square"></i>
                 </div>
                 <div>
                    <div className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Voice Engine</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                       {elevenLabsKey ? (
                          <>ElevenLabs Neural <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wide">Active</span></>
                       ) : (
                          <>Browser Native <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-wide">Standard</span></>
                       )}
                    </div>
                 </div>
              </div>
           </div>

           {/* Language Selection Dropdown */}
           <div className="flex-1 relative z-30">
             <label className="block text-xs font-black uppercase text-slate-400 mb-4 pl-1 text-left">Select Language</label>
             <div className="relative">
                {/* Custom Trigger */}
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand text-lg font-bold text-slate-700 dark:text-white flex items-center justify-between transition-all hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                   <span className="flex items-center gap-3">
                      <span className="text-2xl">{languages.find(l => l.code === selectedLanguage)?.flag}</span>
                      <span>{languages.find(l => l.code === selectedLanguage)?.label}</span>
                   </span>
                   <i className={`fas fa-chevron-down text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {/* Dropdown Panel */}
                {isLangOpen && (
                   <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[300px] overflow-hidden flex flex-col z-50 animate-in fade-in zoom-in-95 duration-200">
                         {/* Search Input */}
                         <div className="p-3 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800">
                            <div className="relative">
                               <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                               <input 
                                 type="text" 
                                 placeholder="Search language..." 
                                 value={langSearch}
                                 onChange={(e) => setLangSearch(e.target.value)}
                                 className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-brand outline-none text-sm font-bold text-slate-700 dark:text-white transition-all"
                                 autoFocus
                               />
                            </div>
                         </div>
                         
                         {/* Options List */}
                         <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {languages
                              .filter(l => l.label.toLowerCase().includes(langSearch.toLowerCase()))
                              .map(lang => (
                                <button
                                  key={lang.code}
                                  onClick={() => {
                                     setSelectedLanguage(lang.code);
                                     setIsLangOpen(false);
                                     setLangSearch('');
                                  }}
                                  className={`w-full px-4 py-3 rounded-xl flex items-center justify-between text-sm font-bold transition-colors ${
                                     selectedLanguage === lang.code 
                                       ? 'bg-brand/10 text-brand' 
                                       : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                  }`}
                                >
                                   <span className="flex items-center gap-3">
                                      <span className="text-xl">{lang.flag}</span>
                                      <span>{lang.label}</span>
                                   </span>
                                   {selectedLanguage === lang.code && <i className="fas fa-check"></i>}
                                </button>
                              ))}
                            {languages.filter(l => l.label.toLowerCase().includes(langSearch.toLowerCase())).length === 0 && (
                               <div className="p-4 text-center text-xs font-bold text-slate-400">No languages found</div>
                            )}
                         </div>
                      </div>
                   </>
                )}
             </div>
           </div>
           
           <div className="h-px bg-slate-100 dark:bg-slate-700 w-full"></div>
           
           {/* Persona Selection */}
           <div className="flex-1">
             <label className="block text-xs font-black uppercase text-slate-400 mb-4 pl-1 text-left">Select Persona</label>
             <div className="flex flex-wrap gap-3 justify-center">
               {personas.map(p => (
                 <button
                   key={p.id}
                   onClick={() => setSelectedPersona(p.id as any)}
                   className={`px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                     selectedPersona === p.id 
                       ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-105' 
                       : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300'
                   }`}
                 >
                   {p.label}
                   {selectedPersona === p.id && <i className="fas fa-check"></i>}
                 </button>
               ))}
             </div>
           </div>
        </div>

        {/* Interactive Area */}
        <div className="relative min-h-[300px] flex flex-col items-center justify-center mt-12">
          {/* Central Button */}
          <div className="relative z-20">
            <button 
              onClick={toggleInteraction}
              className={`relative w-72 h-24 rounded-full flex items-center justify-center gap-4 transition-all duration-500 shadow-2xl ${
                status === 'listening' ? 'bg-red-500 scale-110 shadow-red-500/50' : 
                status === 'speaking' ? 'bg-emerald-500 scale-105 shadow-emerald-500/50' : 
                'bg-brand hover:scale-105 shadow-brand/40'
              }`}
            >
               {status === 'listening' && (
                 <>
                    <span className="absolute inset-0 rounded-full border-4 border-red-500/30 animate-ping"></span>
                    <span className="absolute inset-0 rounded-full border-4 border-red-500/20 animate-ping animation-delay-500"></span>
                 </>
               )}
               {status === 'speaking' && (
                 <>
                    <span className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping"></span>
                    <span className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping animation-delay-500"></span>
                 </>
               )}
               
               <i className={`fas ${status === 'listening' ? 'fa-microphone-lines' : status === 'speaking' ? 'fa-volume-high' : 'fa-microphone'} text-white text-3xl`}></i>
               <div className="flex flex-col items-start">
                   <span className="text-white font-black uppercase tracking-widest text-sm">
                     {status === 'idle' ? 'Start Conversation' : 
                      status === 'listening' ? 'Listening...' : 
                      status === 'processing' ? 'Thinking...' : 'Agent Speaking'}
                   </span>
                   {status === 'idle' && <span className="text-white/60 text-[10px] font-bold uppercase tracking-wide">Click to speak</span>}
               </div>
            </button>
          </div>

          {/* Floating Chat Bubbles */}
          <div className="absolute inset-0 pointer-events-none">
            {messages.map((msg, i) => (
              <div 
                key={i}
                className={`absolute transition-all duration-700 max-w-xs p-5 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-md border border-white/20 ${
                  msg.role === 'user' 
                    ? 'right-0 top-1/2 -translate-y-32 bg-white/90 text-slate-900 rounded-tr-none translate-x-4 shadow-slate-200/50' 
                    : 'left-0 top-1/2 translate-y-20 bg-slate-900/90 text-white rounded-tl-none -translate-x-4 shadow-slate-900/50'
                } ${i === messages.length - 1 ? 'opacity-100 scale-100 blur-0' : 'opacity-40 scale-90 blur-sm'}`}
                style={{
                  top: msg.role === 'user' ? `${30 + (i * 10)}%` : `${50 + (i * 10)}%`,
                  zIndex: i
                }}
              >
                {msg.text}
              </div>
            ))}
            
            {/* Live Transcript */}
            {transcript && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-32 bg-white dark:bg-slate-800 px-8 py-4 rounded-2xl shadow-2xl border border-brand/20 min-w-[300px]">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Live Transcript</p>
                <p className="text-slate-800 dark:text-white text-sm font-medium animate-pulse">"{transcript}"</p>
              </div>
            )}
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/5 to-transparent blur-3xl rounded-full pointer-events-none"></div>
        </div>
          </>
        ) : (
          <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
             <div className="text-center space-y-2">
               <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                 <i className="fas fa-phone-volume"></i>
               </div>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">Live Call Demo</h3>
               <p className="text-sm text-slate-500 font-medium">Experience Ringg.ai's latency and voice quality on your own phone.</p>
             </div>
             
             <div className="space-y-6">
               {/* Telephony Status */}
               <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ringgApiKey ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-400'}`}>
                        <i className="fas fa-network-wired"></i>
                     </div>
                     <div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Telephony Core</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                           {ringgApiKey ? (
                              <>Ringg.ai Enterprise <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wide">Connected</span></>
                           ) : (
                              <>Not Configured <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-wide">Offline</span></>
                           )}
                        </div>
                     </div>
                  </div>
                  {ringgApiKey && (
                      <button 
                        onClick={fetchRinggData}
                        disabled={fetchStatus === 'loading'}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors"
                        title="Refresh Data"
                      >
                         <i className={`fas fa-sync-alt ${fetchStatus === 'loading' ? 'fa-spin' : ''}`}></i>
                      </button>
                  )}
               </div>
               
               {fetchStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-3 rounded-xl text-center">
                     <p className="text-xs text-red-500 dark:text-red-400 font-bold">
                        Failed to load data. Check API Key or Proxy.
                     </p>
                  </div>
               )}
               <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2 pl-1">Your Name</label>
                  <input 
                    type="text"
                    value={calleeName}
                    onChange={(e) => setCalleeName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-slate-700 dark:text-white"
                  />
               </div>

               <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2 pl-1">Phone Number</label>
                  <input 
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-slate-700 dark:text-white"
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 pl-1">Agent</label>
                    <select 
                      value={agentId}
                      onChange={(e) => setAgentId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-slate-700 dark:text-white"
                    >
                      <option value="">Select Agent</option>
                      {availableAgents.map((agent: any) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.agent_display_name}
                        </option>
                      ))}
                      {!availableAgents.length && <option value="03d52efe-4b9a-4ae7-8279-4bba84d6838a">Default Agent (Sandhya)</option>}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 pl-1">Call From</label>
                    <select 
                      value={fromNumberId}
                      onChange={(e) => setFromNumberId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-slate-700 dark:text-white"
                    >
                      <option value="">Select Number</option>
                      {availableNumbers.map((num: any) => (
                        <option key={num.id} value={num.id}>
                          {num.number} ({num.provider})
                        </option>
                      ))}
                      {!availableNumbers.length && <option value="d0259fdd-3037-48c3-bb74-cb01c6d0427b">Default Number (+918071387390)</option>}
                    </select>
                 </div>
               </div>

               {callStatusMsg && (
                   <div className={`text-xs font-bold text-center p-3 rounded-lg ${callStatus === 'error' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                       {callStatusMsg}
                   </div>
               )}

               <button 
                 onClick={handleRinggCall}
                 disabled={callStatus === 'calling'}
                 className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 {callStatus === 'calling' ? (
                     <span className="flex items-center justify-center gap-2">
                         <i className="fas fa-spinner fa-spin"></i> Connecting...
                     </span>
                 ) : 'Call Me Now'}
               </button>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TryAgentDemo;
