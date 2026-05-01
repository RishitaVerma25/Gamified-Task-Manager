import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState, useUserDispatch } from './UserContext';

const SHOP_ITEMS = [
  { id: 'av-arch', name: 'Architect', avatar: 'ARC', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Architect&backgroundColor=b6e3f4', price: 200 },
  { id: 'av-oper', name: 'Operative', avatar: 'OPE', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Operative&backgroundColor=b6e3f4', price: 200 },
  { id: 'av-cybr', name: 'Cyborg', avatar: 'CYB', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Cyborg&backgroundColor=b6e3f4', price: 300 },
  { id: 'av-xeno', name: 'Xeno', avatar: 'XEN', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Xeno&backgroundColor=b6e3f4', price: 400 },
  { id: 'av-wrth', name: 'Wraith', avatar: 'WRA', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Wraith&backgroundColor=b6e3f4', price: 500 },
  { id: 'av-dire', name: 'Director', avatar: 'DIR', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Director&backgroundColor=b6e3f4', price: 1000 },
];

export default function Shop() {
  const navigate = useNavigate();
  const { userProfile } = useUserState();
  const { buyItem, equipAvatar } = useUserDispatch();

  return (
    <div className="shop-page">
      <div className="shop-page-header">
        <div className="header-text">
          <h1 className="board-title">REQUISITION HUB</h1>
          <p className="breadcrumb-muted">Allocate gold units for advanced operative credentials</p>
        </div>
        <div className="stat-chip highlight">
          <span>💰</span>
          <span>{userProfile.totalGold}G</span>
        </div>
      </div>

      <div className="shop-grid">
        {SHOP_ITEMS.map((item) => {
          const isOwned = userProfile.ownedAvatars.includes(item.image);
          const isEquipped = userProfile.avatar === item.image;
          const canAfford = userProfile.totalGold >= item.price;

          return (
            <div key={item.id} className={`reward-card ${isEquipped ? 'equipped' : ''}`}>
              <div className="reward-image-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  className="reward-img"
                />
                <div className="reward-badge">
                  {item.avatar}
                </div>
              </div>

              <div className="reward-meta">
                <div className="reward-name">{item.name.toUpperCase()}</div>
                <div className={`reward-price ${isOwned ? 'owned' : ''}`}>
                  {isOwned ? (isEquipped ? 'ACTIVE' : 'REQUISITIONED') : `${item.price}G`}
                </div>
              </div>

              <div className="reward-actions">
                {isEquipped ? (
                  <div className="status-equipped">
                    ✨ CURRENT
                  </div>
                ) : isOwned ? (
                  <button className="btn-primary outline" onClick={() => equipAvatar(item.image)}>
                    EQUIP
                  </button>
                ) : (
                  <button
                    className={`btn-primary ${!canAfford ? 'locked' : ''}`}
                    disabled={!canAfford}
                    onClick={() => buyItem({ ...item, avatar: item.image })}
                  >
                    {canAfford ? 'PURCHASE' : 'LOCKED'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="shop-footer">
        <button className="btn-icon-text" onClick={() => navigate('/')}>
          ⬅️ RETURN TO COMMAND
        </button>
      </div>
    </div>
  );
}
