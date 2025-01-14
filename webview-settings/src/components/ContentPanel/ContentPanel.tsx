import React from 'react';
import styles from './ContentPanel.module.css';

export interface Setting {
  title: string;
  description: string;
  enabled: boolean;
  additionalInfo?: string;
}

interface ContentPanelProps {
  title: string;
  settings?: Setting[];
  onToggleSetting?: (settingTitle: string) => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  title,
  settings = [],
  onToggleSetting = () => {},
}) => {
  return (
    <div className={styles.contentPanel}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {settings.map((setting) => (
        <div key={setting.title} className={styles.settingItem}>
          <div className={styles.settingHeader}>
            <input
              type="checkbox"
              checked={setting.enabled}
              onChange={() => onToggleSetting(setting.title)}
              aria-label={`Toggle ${setting.title}`}
            />
            <span>{setting.title}</span>
          </div>
          <p className={styles.settingDescription}>{setting.description}</p>
          {setting.additionalInfo && (
            <p className={styles.settingInfo}>{setting.additionalInfo}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentPanel; 