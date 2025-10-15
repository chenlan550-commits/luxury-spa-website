import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Star, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const translations = {
  zh: {
    title: '專業療程服務',
    subtitle: '體驗我們的頂級doTERRA精油療程',
    categories: {
      bodyspa: '身體療程',
      facialspa: '臉部護理', 
      minispa: '加購課程',
      pregnancyspa: '孕婦專護'
    },
    services: {
      bodyspa: [
        { 
          id: 'B01', 
          name: '顱沐淋巴舒壓', 
          price: 2180, 
          selfOilPrice: 1480, 
          duration: 60, 
          description: '舒緩頭部壓力，促進淋巴循環，改善頭痛與睡眠品質，讓大腦放鬆，思緒清晰。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 淋巴引流 → 頭部舒壓 → 頭肩頸SPA'
        },
        { 
          id: 'B02', 
          name: '腿部輕迎煥新護理', 
          price: 1880, 
          selfOilPrice: 1280, 
          duration: 60, 
          description: '改善腿部水腫與疲勞，促進下肢循環，讓雙腿輕盈有活力，適合久站久坐族群。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 腿部深層排導 → 足部按摩 → 腿部緊緻護理'
        },
        { 
          id: 'B03', 
          name: '輕奢課程', 
          price: 2300, 
          selfOilPrice: 1500, 
          duration: 70, 
          description: '全身舒壓入門體驗，適合初次嘗試芳療SPA，放鬆身心，感受精油的療癒力量。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 全背舒壓 → 腿部排導 → 腹部疏通 → 頭肩頸SPA'
        },
        { 
          id: 'B04', 
          name: '盈纖緊緻雕塑', 
          price: 2200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: '針對身體曲線雕塑，緊緻肌膚，改善橘皮組織，打造窈窕體態與彈潤膚質。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 全背舒壓 → 腹部雕塑 → 腿部緊緻 → 臀部提拉 → 手臂塑型'
        },
        { 
          id: 'B05', 
          name: '極緻舒活全身釋壓', 
          price: 2200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: '提升活力與精神，適合忙碌現代人的能量補充，全方位深層放鬆，重啟身心平衡。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 全背舒壓 → 腿部排導 → 腹部疏通 → 胸部暢通 → 頭肩頸SPA',
          options: [
            { duration: 90, price: 2200, selfOilPrice: 1600 },
            { duration: 120, price: 2880, selfOilPrice: 2080 }
          ]
        },
        { 
          id: 'B06', 
          name: '芳香溫灸', 
          price: 2600, 
          selfOilPrice: 1800, 
          duration: 90, 
          description: '結合溫熱能量與精油芳療，深層溫暖經絡，驅散寒氣，促進氣血循環，適合體質虛寒者。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 全背溫灸 → 腹部溫灸 → 腿部溫灸 → 經絡疏通 → 溫熱放鬆'
        },
        { 
          id: 'B07', 
          name: '淋巴芳香調理', 
          price: 2200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: '全身淋巴系統深層疏通，排除體內毒素與廢物，增強免疫力，改善水腫與疲勞感。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 全背淋巴排導 → 腿部淋巴疏通 → 腹部淋巴調理 → 手臂淋巴 → 頭肩頸SPA'
        },
        { 
          id: 'B08', 
          name: '舞風暖宮疏胸', 
          price: 3200, 
          selfOilPrice: 2400, 
          duration: 120, 
          description: '調理女性生殖系統，溫養子宮，疏通乳腺，改善經期不適，呵護女性健康與荷爾蒙平衡。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 全背舒壓 → 腿部排導 → 暖宮疏胸 → 手部放鬆 → 頭肩頸SPA'
        },
        { 
          id: 'B09', 
          name: '美胸窈窕纖盈', 
          price: 3400, 
          selfOilPrice: 2400, 
          duration: 130, 
          description: '美胸護理結合全身塑型，提升胸部線條，雕塑腰腹曲線，打造優雅體態與自信美。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 全背舒壓 → 腿部排導 → 腹部纖盈 → 美胸護理 → 手臂塑型 → 頭肩頸SPA'
        }
      ],
      facialspa: [
        { 
          id: 'F01', 
          name: '晶亮雪肌嫩白', 
          price: 4200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: '深層淨化肌膚，改善暗沉與色素沉澱，提升肌膚透亮度，打造白皙透亮的水潤光澤肌。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 深層清潔 → 臉部淋巴排導 → 美白精華導入 → 亮白面膜 → 保濕鎖水 → 頭肩頸放鬆'
        },
        { 
          id: 'F02', 
          name: '清新亮妍臉部保養', 
          price: 2400, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: '基礎臉部深層護理，平衡油水，改善粗糙與暗沉，恢復肌膚健康光采，適合各種膚質。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 溫和清潔 → 去角質 → 臉部按摩 → 保濕面膜 → 精華鎖水 → 頭肩頸舒壓'
        },
        { 
          id: 'F03', 
          name: '晶緻亮眼肌活', 
          price: 3200, 
          selfOilPrice: 2400, 
          duration: 130, 
          description: '全臉深層保養搭配專業眼部護理，淡化細紋與黑眼圈，緊緻眼周肌膚，重現明亮有神雙眸。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 深層清潔 → 去角質 → 全臉淋巴排導 → 眼部精華導入 → 眼周按摩 → 全臉精華按摩 → 眼膜敷護 → 臉部面膜 → 保濕鎖水 → 頭肩頸放鬆'
        }
      ],
      minispa: [
        { 
          id: 'M01', 
          name: '能量甦醒', 
          price: 500, 
          duration: 20, 
          description: '快速喚醒身心活力，提振精神，適合療程前後加強或短時間能量補充。'
        },
        { 
          id: 'M02', 
          name: '頭部理療', 
          price: 500, 
          duration: 20, 
          description: '舒緩頭部緊繃與壓力，改善頭痛，促進頭部血液循環，讓思緒清晰放鬆。'
        },
        { 
          id: 'M03', 
          name: '纖體釋放（腰、手、背）', 
          price: 690, 
          duration: 20, 
          description: '針對局部緊繃部位深層放鬆，疏通經絡，緩解肌肉痠痛，適合加強特定部位護理。'
        },
        { 
          id: 'M04', 
          name: '溫感淨化泥浴', 
          price: 1099, 
          duration: 30, 
          description: '深層排毒淨化，溫熱促進代謝，軟化角質，提升肌膚光滑細緻度，身心煥然一新。'
        },
        { 
          id: 'M05', 
          name: '暖宮疏胸', 
          price: 800, 
          duration: 40, 
          description: '溫養子宮，疏通乳腺，改善經期不適與胸悶，適合女性單獨加購或搭配其他療程。'
        },
        { 
          id: 'M06', 
          name: '加價課程', 
          price: 600, 
          duration: 30, 
          description: '想要更深層的放鬆體驗？可將您的療程延長，享受更充裕的舒壓時光。',
          options: [
            { duration: 30, price: 600 },
            { duration: 60, price: 1000 }
          ]
        }
      ],
      pregnancyspa: [
        { 
          id: 'P01', 
          name: '孕婦SPA', 
          subtitle: 'PREGNANT MASSAGE｜給媽咪安心好孕',
          price: 2400, 
          duration: 90, 
          description: '專為準媽咪量身打造的溫柔呵護療程，減輕孕期腰痠背痛與水腫不適，安撫身心、減緩壓力，幫助肌肉保持健康彈性，降低懷孕期間的身心負擔，讓您舒適安心地迎接新生命。',
          process: '鬆筋放鬆 → 嗅吸活化 → 系統精油分層塗抹 → 側臥背部舒緩 → 腿部溫柔排導 → 足部按摩 → 肩頸放鬆 → 手臂舒壓 → 孕期專屬安撫手法'
        }
      ]
    },
    bookNow: '立即預約',
    duration: '療程時間',
    minutes: '分鐘',
    originalPrice: '原價',
    specialPrice: '特惠價',
    popular: '熱門',
    new: '新品'
  },
  en: {
    title: 'Professional Treatment Services',
    subtitle: 'Experience our premium doTERRA essential oil treatments',
    categories: {
      bodyspa: 'Body Treatments',
      facialspa: 'Facial Care',
      minispa: 'Add-on Services',
      pregnancyspa: 'Pregnancy Care'
    },
    services: {
      bodyspa: [
        { 
          id: 'B01', 
          name: 'Cranial Lymphatic Relief', 
          price: 2180, 
          selfOilPrice: 1480, 
          duration: 60, 
          description: 'Relieve head pressure, promote lymphatic circulation, improve headaches and sleep quality, relax the brain and clear thoughts.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Lymphatic Drainage → Head Relief → Head, Shoulder & Neck SPA'
        },
        { 
          id: 'B02', 
          name: 'Leg Renewal Care', 
          price: 1880, 
          selfOilPrice: 1280, 
          duration: 60, 
          description: 'Improve leg swelling and fatigue, promote lower limb circulation, make legs light and energetic, suitable for people who stand or sit for long periods.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Deep Leg Drainage → Foot Massage → Leg Firming Care'
        },
        { 
          id: 'B03', 
          name: 'Luxury Introductory Course', 
          price: 2300, 
          selfOilPrice: 1500, 
          duration: 70, 
          description: 'Full-body stress relief introductory experience, suitable for first-time aromatherapy SPA, relax body and mind, feel the healing power of essential oils.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Full Back Relief → Leg Drainage → Abdominal Clearing → Head, Shoulder & Neck SPA'
        },
        { 
          id: 'B04', 
          name: 'Slimming Firming Sculpting', 
          price: 2200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: 'Target body curve sculpting, firm skin, improve cellulite, create graceful figure and elastic skin texture.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Full Back Relief → Abdominal Sculpting → Leg Firming → Hip Lifting → Arm Shaping'
        },
        { 
          id: 'B05', 
          name: 'Ultimate Relaxation Full Body Release', 
          price: 2200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: 'Boost vitality and spirit, suitable for busy modern people\'s energy supplement, comprehensive deep relaxation, restart body and mind balance.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Full Back Relief → Leg Drainage → Abdominal Clearing → Chest Opening → Head, Shoulder & Neck SPA',
          options: [
            { duration: 90, price: 2200, selfOilPrice: 1600 },
            { duration: 120, price: 2880, selfOilPrice: 2080 }
          ]
        },
        { 
          id: 'B06', 
          name: 'Aromatic Moxibustion', 
          price: 2600, 
          selfOilPrice: 1800, 
          duration: 90, 
          description: 'Combine warm energy with essential oil aromatherapy, deeply warm meridians, dispel cold, promote blood circulation, suitable for those with cold constitution.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Full Back Moxibustion → Abdominal Moxibustion → Leg Moxibustion → Meridian Clearing → Warm Relaxation'
        },
        { 
          id: 'B07', 
          name: 'Lymphatic Aromatic Therapy', 
          price: 2200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: 'Deep lymphatic system clearing throughout the body, eliminate toxins and waste, enhance immunity, improve swelling and fatigue.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Full Back Lymphatic Drainage → Leg Lymphatic Clearing → Abdominal Lymphatic Therapy → Arm Lymphatic → Head, Shoulder & Neck SPA'
        },
        { 
          id: 'B08', 
          name: 'Feminine Warming & Chest Care', 
          price: 3200, 
          selfOilPrice: 2400, 
          duration: 120, 
          description: 'Regulate female reproductive system, warm and nourish uterus, clear mammary glands, improve menstrual discomfort, care for women\'s health and hormonal balance.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Full Back Relief → Leg Drainage → Uterine Warming & Chest Care → Hand Relaxation → Head, Shoulder & Neck SPA'
        },
        { 
          id: 'B09', 
          name: 'Breast Enhancement & Body Sculpting', 
          price: 3400, 
          selfOilPrice: 2400, 
          duration: 130, 
          description: 'Breast care combined with full body sculpting, enhance breast lines, sculpt waist and abdominal curves, create elegant posture and confident beauty.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Full Back Relief → Leg Drainage → Abdominal Slimming → Breast Care → Arm Shaping → Head, Shoulder & Neck SPA'
        }
      ],
      facialspa: [
        { 
          id: 'F01', 
          name: 'Crystal Bright Snow Skin Whitening', 
          price: 4200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: 'Deep skin purification, improve dullness and pigmentation, enhance skin brightness, create fair and radiant moisturized glowing skin.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Deep Cleansing → Facial Lymphatic Drainage → Whitening Essence Infusion → Brightening Mask → Moisturizing Lock → Head, Shoulder & Neck Relaxation'
        },
        { 
          id: 'F02', 
          name: 'Fresh Radiant Facial Care', 
          price: 2400, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: 'Basic deep facial care, balance oil and water, improve roughness and dullness, restore healthy skin radiance, suitable for all skin types.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Gentle Cleansing → Exfoliation → Facial Massage → Moisturizing Mask → Essence Lock → Head, Shoulder & Neck Relief'
        },
        { 
          id: 'F03', 
          name: 'Crystal Bright Eye Revitalization', 
          price: 3200, 
          selfOilPrice: 2400, 
          duration: 130, 
          description: 'Full facial deep care combined with professional eye care, fade fine lines and dark circles, firm eye area skin, restore bright and radiant eyes.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Deep Cleansing → Exfoliation → Full Face Lymphatic Drainage → Eye Essence Infusion → Eye Area Massage → Full Face Essence Massage → Eye Mask Treatment → Facial Mask → Moisturizing Lock → Head, Shoulder & Neck Relaxation'
        }
      ],
      minispa: [
        { 
          id: 'M01', 
          name: 'Energy Revival', 
          price: 500, 
          duration: 20, 
          description: 'Quickly awaken body and mind vitality, boost energy, suitable for pre/post treatment enhancement or short-term energy boost.'
        },
        { 
          id: 'M02', 
          name: 'Head Therapy', 
          price: 500, 
          duration: 20, 
          description: 'Relieve head tension and pressure, improve headaches, promote head blood circulation, clear and relax the mind.'
        },
        { 
          id: 'M03', 
          name: 'Body Release (Waist, Arms, Back)', 
          price: 690, 
          duration: 20, 
          description: 'Deep relaxation for specific tense areas, clear meridians, relieve muscle soreness, suitable for targeted area care.'
        },
        { 
          id: 'M04', 
          name: 'Warm Purifying Mud Bath', 
          price: 1099, 
          duration: 30, 
          description: 'Deep detox purification, warm heat promotes metabolism, softens dead skin, enhances skin smoothness, body and mind renewal.'
        },
        { 
          id: 'M05', 
          name: 'Uterine Warming & Chest Care', 
          price: 800, 
          duration: 40, 
          description: 'Warm and nourish uterus, clear mammary glands, improve menstrual discomfort and chest tightness, suitable for women as standalone or combined treatment.'
        },
        { 
          id: 'M06', 
          name: 'Extension Service', 
          price: 600, 
          duration: 30, 
          description: 'Want a deeper relaxation experience? Extend your treatment time for more luxurious stress relief.',
          options: [
            { duration: 30, price: 600 },
            { duration: 60, price: 1000 }
          ]
        }
      ],
      pregnancyspa: [
        { 
          id: 'P01', 
          name: 'Pregnancy SPA', 
          subtitle: 'PREGNANT MASSAGE｜Safe & Comfortable Care for Mothers',
          price: 2400, 
          duration: 90, 
          description: 'Specially designed gentle care treatment for expectant mothers, relieving pregnancy-related back pain and swelling discomfort, soothing body and mind, reducing stress, helping muscles maintain healthy elasticity, reducing physical and mental burden during pregnancy, allowing you to comfortably and safely welcome new life.',
          process: 'Muscle Relaxation → Aromatic Activation → Layered Essential Oil Application → Side-lying Back Relief → Gentle Leg Drainage → Foot Massage → Shoulder & Neck Relaxation → Arm Stress Relief → Pregnancy-specific Soothing Techniques'
        }
      ]
    },
    bookNow: 'Book Now',
    duration: 'Duration',
    minutes: 'minutes',
    originalPrice: 'Original Price',
    specialPrice: 'Special Price',
    popular: 'Popular',
    new: 'New'
  },
  ja: {
    title: 'プロフェッショナルトリートメントサービス',
    subtitle: '私たちのプレミアムdoTERRAエッセンシャルオイルトリートメントを体験',
    categories: {
      bodyspa: 'ボディトリートメント',
      facialspa: 'フェイシャルケア',
      minispa: '追加コース',
      pregnancyspa: 'マタニティケア'
    },
    services: {
      bodyspa: [
        { 
          id: 'B01', 
          name: '頭蓋リンパ緩和', 
          price: 2180, 
          selfOilPrice: 1480, 
          duration: 60, 
          description: '頭部の圧力を緩和し、リンパ循環を促進し、頭痛と睡眠の質を改善し、脳をリラックスさせ、思考を明晰にします。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → リンパドレナージュ → 頭部緩和 → 頭肩首SPA'
        },
        { 
          id: 'B02', 
          name: '脚部軽やか再生ケア', 
          price: 1880, 
          selfOilPrice: 1280, 
          duration: 60, 
          description: '脚のむくみと疲労を改善し、下肢循環を促進し、脚を軽やかで活力あるものにし、長時間立ったり座ったりする人に適しています。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 脚部深層ドレナージュ → 足マッサージ → 脚部引き締めケア'
        },
        { 
          id: 'B03', 
          name: 'ラグジュアリー入門コース', 
          price: 2300, 
          selfOilPrice: 1500, 
          duration: 70, 
          description: '全身ストレス緩和入門体験、初回アロマテラピーSPAに適し、心身をリラックスさせ、精油の癒しの力を感じます。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 全背中緩和 → 脚部ドレナージュ → 腹部疏通 → 頭肩首SPA'
        },
        { 
          id: 'B04', 
          name: 'スリム引き締め彫刻', 
          price: 2200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: 'ボディカーブ彫刻をターゲットに、肌を引き締め、セルライトを改善し、しなやかな体型と弾力のある肌質を作ります。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 全背中緩和 → 腹部彫刻 → 脚部引き締め → ヒップリフト → 腕シェイピング'
        },
        { 
          id: 'B05', 
          name: '極上リラックス全身解放', 
          price: 2200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: '活力と精神を向上させ、忙しい現代人のエネルギー補給に適し、全方位深層リラクゼーション、心身バランスを再起動。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 全背中緩和 → 脚部ドレナージュ → 腹部疏通 → 胸部開通 → 頭肩首SPA',
          options: [
            { duration: 90, price: 2200, selfOilPrice: 1600 },
            { duration: 120, price: 2880, selfOilPrice: 2080 }
          ]
        },
        { 
          id: 'B06', 
          name: '芳香温灸', 
          price: 2600, 
          selfOilPrice: 1800, 
          duration: 90, 
          description: '温熱エネルギーと精油アロマテラピーを組み合わせ、経絡を深層温暖化し、寒気を払い、血行を促進し、寒性体質の方に適しています。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 全背中温灸 → 腹部温灸 → 脚部温灸 → 経絡疏通 → 温熱リラクゼーション'
        },
        { 
          id: 'B07', 
          name: 'リンパ芳香調理', 
          price: 2200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: '全身リンパシステム深層疏通、体内毒素と老廃物を排除し、免疫力を向上させ、むくみと疲労感を改善します。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 全背中リンパドレナージュ → 脚部リンパ疏通 → 腹部リンパ調理 → 腕リンパ → 頭肩首SPA'
        },
        { 
          id: 'B08', 
          name: '舞風温宮疏胸', 
          price: 3200, 
          selfOilPrice: 2400, 
          duration: 120, 
          description: '女性生殖システムを調理し、子宮を温養し、乳腺を疏通し、生理不快を改善し、女性の健康とホルモンバランスをケアします。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 全背中緩和 → 脚部ドレナージュ → 温宮疏胸 → 手部リラクゼーション → 頭肩首SPA'
        },
        { 
          id: 'B09', 
          name: '美胸しなやかスリム', 
          price: 3400, 
          selfOilPrice: 2400, 
          duration: 130, 
          description: 'バストケアと全身シェイピングを組み合わせ、胸部ラインを向上させ、ウエスト腹部カーブを彫刻し、エレガントな体型と自信美を作ります。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 全背中緩和 → 脚部ドレナージュ → 腹部スリム → バストケア → 腕シェイピング → 頭肩首SPA'
        }
      ],
      facialspa: [
        { 
          id: 'F01', 
          name: '晶亮雪肌美白', 
          price: 4200, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: '肌膚深層浄化、くすみと色素沈着を改善し、肌の透明感を向上させ、白く透明で潤いのある輝く肌を作ります。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 深層クレンジング → 顔面リンパドレナージュ → 美白エッセンス導入 → ブライトニングマスク → 保湿ロック → 頭肩首リラクゼーション'
        },
        { 
          id: 'F02', 
          name: '清新輝顔フェイシャルケア', 
          price: 2400, 
          selfOilPrice: 1600, 
          duration: 90, 
          description: '基礎的な顔面深層ケア、油水バランス、粗さとくすみを改善し、肌の健康的な輝きを回復、あらゆる肌質に適しています。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 優しいクレンジング → 角質除去 → フェイシャルマッサージ → 保湿マスク → エッセンスロック → 頭肩首緩和'
        },
        { 
          id: 'F03', 
          name: '晶緻明眸肌活', 
          price: 3200, 
          selfOilPrice: 2400, 
          duration: 130, 
          description: '全顔深層ケアと専門的なアイケアを組み合わせ、小じわとクマを薄くし、目元の肌を引き締め、明るく輝く瞳を取り戻します。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 深層クレンジング → 角質除去 → 全顔リンパドレナージュ → アイエッセンス導入 → 目元マッサージ → 全顔エッセンスマッサージ → アイマスクケア → フェイシャルマスク → 保湿ロック → 頭肩首リラクゼーション'
        }
      ],
      minispa: [
        { 
          id: 'M01', 
          name: 'エネルギー蘇生', 
          price: 500, 
          duration: 20, 
          description: '心身の活力を素早く目覚めさせ、精神を向上させ、トリートメント前後の強化や短時間のエネルギー補給に適しています。'
        },
        { 
          id: 'M02', 
          name: 'ヘッドセラピー', 
          price: 500, 
          duration: 20, 
          description: '頭部の緊張と圧力を緩和し、頭痛を改善し、頭部の血液循環を促進し、思考を明晰にリラックスさせます。'
        },
        { 
          id: 'M03', 
          name: 'ボディリリース（腰・腕・背中）', 
          price: 690, 
          duration: 20, 
          description: '局部の緊張部位を深層リラックス、経絡を疏通し、筋肉の痛みを緩和し、特定部位のケア強化に適しています。'
        },
        { 
          id: 'M04', 
          name: '温感浄化泥浴', 
          price: 1099, 
          duration: 30, 
          description: '深層デトックス浄化、温熱で代謝を促進し、角質を軟化し、肌の滑らかさを向上させ、心身を一新します。'
        },
        { 
          id: 'M05', 
          name: '温宮疏胸', 
          price: 800, 
          duration: 40, 
          description: '子宮を温養し、乳腺を疏通し、生理不快と胸の詰まりを改善し、女性の単独追加購入や他のトリートメントとの組み合わせに適しています。'
        },
        { 
          id: 'M06', 
          name: '追加料金コース', 
          price: 600, 
          duration: 30, 
          description: 'より深いリラクゼーション体験をお望みですか？トリートメント時間を延長し、より充実したストレス解消時間をお楽しみください。',
          options: [
            { duration: 30, price: 600 },
            { duration: 60, price: 1000 }
          ]
        }
      ],
      pregnancyspa: [
        { 
          id: 'P01', 
          name: '妊婦SPA', 
          subtitle: 'PREGNANT MASSAGE｜ママに安心で良い妊娠',
          price: 2400, 
          duration: 90, 
          description: '妊婦さんのために特別に設計された優しいケアトリートメント、妊娠期の腰痛と浮腫の不快感を軽減し、心身を慰め、ストレスを緩和し、筋肉の健康的な弾力性を保ち、妊娠期間中の心身の負担を軽減し、快適で安心して新しい生命を迎えることができます。',
          process: '筋肉リラクゼーション → 芳香活性化 → システム精油層塗布 → 側臥位背中緩和 → 脚部優しいドレナージュ → 足マッサージ → 肩首リラクゼーション → 腕ストレス解消 → 妊娠期専用慰撫手法'
        }
      ]
    },
    bookNow: '今すぐ予約',
    duration: '所要時間',
    minutes: '分',
    originalPrice: '通常価格',
    specialPrice: '特別価格',
    popular: '人気',
    new: '新着'
  }
}

export default function Services({ language }) {
  const [activeCategory, setActiveCategory] = useState('bodyspa')
  const t = translations[language]

  const categories = Object.keys(t.categories)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100 pt-20">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-white/30"></div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-white shadow-sm sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                {t.categories[category]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services[activeCategory]?.map((service, index) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                {/* Service Image */}
                <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 relative overflow-hidden">
                  {/* 根據服務ID顯示對應圖片 */}
                  {service.id === 'B01' && (
                    <img 
                      src="/cranial-lymphatic.png" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'B02' && (
                    <img 
                      src="/leg-care.png" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'B03' && (
                    <img 
                      src="/luxury-intro.png" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'B04' && (
                    <img 
                      src="/body-sculpting.jpg" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'B05' && (
                    <img 
                      src="/full-body-relaxation.png" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'B06' && (
                    <img 
                      src="/aromatic-moxibustion.jpg" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'B07' && (
                    <img 
                      src="/lymphatic-drainage.jpg" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'B08' && (
                    <img 
                      src="/womb-care.jpg" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'B09' && (
                    <img 
                      src="/breast-body-sculpting.jpg" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'F01' && (
                    <img 
                      src="/facial-whitening.jpg" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {service.id === 'F02' && (
                    <img 
                      src="/facial-care.jpg" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'F03' && (
                    <img 
                      src="/eye-care.png" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {service.id === 'P01' && (
                    <img 
                      src="/pregnancy-spa.png" 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {index < 2 && (
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        index === 0 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                      }`}>
                        {index === 0 ? t.popular : t.new}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{service.duration} {t.minutes}</span>
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {service.name}
                      </h3>
                      {service.subtitle && (
                        <p className="text-sm text-amber-600 font-medium mt-1">
                          {service.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-4">
                    {service.options ? (
                      // 多選項價格顯示
                      <div className="space-y-2">
                        {service.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{option.duration}分鐘</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-amber-600">
                                NT${option.price.toLocaleString()}
                              </span>
                              {option.selfOilPrice && (
                                <span className="text-xs text-green-600">
                                  / NT${option.selfOilPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        {service.options.some(option => option.selfOilPrice) && (
                          <p className="text-xs text-green-600 font-medium">自備多特瑞精油享優惠價</p>
                        )}
                      </div>
                    ) : (
                      // 單一價格顯示
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-2xl font-bold text-amber-600">
                            NT${service.price.toLocaleString()}
                          </span>
                          {service.selfOilPrice && (
                            <span className="text-lg text-green-600 font-medium">
                              / NT${service.selfOilPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {service.selfOilPrice && (
                          <p className="text-xs text-green-600 font-medium">自備多特瑞精油享優惠價</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Process Flow */}
                  {service.process && (
                    <div className="mb-4 p-3 bg-amber-50 rounded-lg">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-medium text-amber-700">療程流程：</span>
                        {service.process}
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm text-gray-600">doTERRA精油</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {service.duration}分鐘
                    </div>
                  </div>

                  {/* Book Button */}
                  <Link to="/booking" state={{ selectedService: service }}>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full py-3 font-medium shadow-md hover:shadow-lg transition-all duration-200">
                      {t.bookNow}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">準備好開始您的放鬆之旅了嗎？</h2>
          <p className="text-xl text-gray-300 mb-8">
            立即預約，體驗我們的專業doTERRA精油療程
          </p>
          <Link to="/booking">
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              立即預約體驗
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

