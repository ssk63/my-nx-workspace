import axios from 'axios';
import type { 
  PersonalVoiceModel, 
  CreatePersonalVoiceDto, 
  UpdatePersonalVoiceDto
} from '../types/personalVoice.types';

const API_URL = 'http://localhost:3001/api/personal-voices';
const DEBUG_URL = 'http://localhost:3001/api/debug';

export const PersonalVoiceClient = {
  /**
   * Debug method to test data structure with debug endpoint
   */
  debugCreateVoice: async (data: CreatePersonalVoiceDto): Promise<any> => {
    const response = await axios.post(DEBUG_URL, data);
    return response.data;
  },

  /**
   * Get all personal voices
   */
  getAllVoices: async (): Promise<PersonalVoiceModel[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  /**
   * Get a personal voice by ID
   */
  getVoiceById: async (id: string): Promise<PersonalVoiceModel> => {
    const response = await axios.get(`${API_URL}/id/${id}`);
    return response.data;
  },

  /**
   * Get a personal voice by key
   */
  getVoiceByKey: async (key: string): Promise<PersonalVoiceModel> => {
    const response = await axios.get(`${API_URL}/key/${key}`);
    return response.data;
  },

  /**
   * Create a new personal voice
   */
  createVoice: async (data: CreatePersonalVoiceDto): Promise<PersonalVoiceModel> => {
    // Uncomment to test with debug endpoint first
    await PersonalVoiceClient.debugCreateVoice(data);
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  /**
   * Update a personal voice
   */
  updateVoice: async (id: string, data: UpdatePersonalVoiceDto): Promise<PersonalVoiceModel> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  /**
   * Delete a personal voice
   */
  deleteVoice: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 